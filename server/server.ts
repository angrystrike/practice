import mongoose from 'mongoose'

import { AwilixContainer } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';
import container, { IContextContainer } from './container';

import { Request, Response, NextFunction } from 'express';
import BaseContext from './BaseContext';
import httpStatus from '../http-status';

const config = require('../config');
const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')

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

  server.use(responses);
  server.use(bodyParser.json())
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

const responses = (req: Request, res: Response, next: NextFunction) => {
  res.answer = (
    data: any,
    message: any = null,
    status: number = httpStatus.OK,
  ) => {
    console.log('return responses')
    return res.status(status).json({
      data,
      message
    });
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

export const successResult = (res, result, message) => {
  const resObj: any = {
    success: true,
    message: message,
    data: result
  }

  if (message && message !== "")
    resObj['message'] = message

  return res.status(200).json(resObj)
}

export const errorResult = (res, error, message, status = 404) => {
  return res.status(status).json({
    success: false,
    message,
  });
}

export default {}
