import mongoose from 'mongoose'

import { loadControllers, scopePerRequest } from 'awilix-express';
import container from './container';
import { PassportStatic } from 'passport';

import { Request, Response, NextFunction } from 'express';
import httpStatus from '../http-status';
import cookieSession from 'cookie-session';
import { IIdentity, ROLE } from './common';
import statusCode from '../http-status'


const path = require('path')
const config = require('../config');
const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
const passport = require('passport');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const startDatabase = async () => {

  connectToMongoDb(config.db.uri, config.db.options)
  startup()
}

app.prepare().then(() => {
  startDatabase()
  const server = express()

  server.use(passport.initialize());
  server.use(passport.session());

  server.use(bodyParser.json({ limit: '10mb' }));
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json())
  server.use(cookieSession({
    name: 'session',
    keys: [config.jwtSecret],
    maxAge: 312460601000,
  }));
  server.use(responses);
  server.use(acl);

  server.use(scopePerRequest(container));
  // const files = 'controllers/**/*.' + (config.dev ? 'ts' : 'js');
  const files = 'controllers/**/*.ts';
  server.use(loadControllers(files, { cwd: __dirname }));


  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

const acl = (req: Request, res: Response, next: NextFunction) => {
  const passport = container.resolve<PassportStatic>("passport")

  let useAcl = true
  const url = req.url
  for (const item of IGNORS) {
    if (url.startsWith(item)) {
      useAcl = false
    }
  }

  if (useAcl) {
    passport.authenticate('jwt', (err, identity: IIdentity) => {
      const isLogged = identity && identity.id && identity.role !== ROLE.GUEST

      if (!isLogged) {
        //identity = clearIdentity()
        console.log('acl identity', identity);
        
        req.identity = identity;
        req.session.identity = identity;
      }

      const isAllow = undefined

      if (!isAllow) {
        return res.answer(null, statusCode['404_MESSAGE'], statusCode.NOT_FOUND)
      }
    })
  }
  next()
}

export const IGNORS = [
  '/favicon.ico',
  '/_next',
  '/static',
  '/sitemap.xml',
  '/robots.txt',
  '/service-worker.js',
  '/manifest.json',
  '/styles.chunk.css.map',
  '/__nextjs',
];

const responses = (req: Request, res: Response, next: NextFunction) => {


  res.answer = (
    data: any,
    message: any = null,
    status: number = httpStatus.OK,
  ) => {
    return res.status(status).json({
      data,
      message
    });
  };

  res.print = (
    pathName: string,
    ssrData: any
  ) => {
    req.ssrData = ssrData;
    //@ts-ignore
    app.render(req, res, pathName, req.query);
  };


  next()
}

const connectToMongoDb = (uri: string, options: mongoose.ConnectionOptions) => {
  mongoose.connect(uri, options)
  mongoose.Promise = global.Promise

  mongoose.connection.on('error', (err) => {
    console.error(`Connection error: ${err}`)
    process.exit(1)
  })

  mongoose.connection.once('open', () => {
    console.info('Mongo is connected')
  })

  return mongoose.connection
}

const startup = () => {
  console.info('Start app')
  let connectionString: mongoose.Connection = null
  try {
    console.info('Initializing database ...');
    connectionString = connectToMongoDb(config.db.uri, config.db.options);

  } catch (e) {
    console.log('ERROR')
  }
}

export default {}
