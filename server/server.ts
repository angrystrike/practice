// import mongoose from 'mongoose'


// const express = require('express')
// const next = require('next')

// const port = parseInt(process.env.PORT, 10) || 3000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   poolSize: 10, 
//   bufferMaxEntries: 0
// }

// const startDatabase = async () => {
//   connectToMongoDb(process.env.MONGODB_URI, options)
//   startup
// }

// app.prepare().then(() => {
//   startDatabase()
//   const server = express()

//   server.all('*', (req, res) => {
//     return handle(req, res)
//   })

//   server.listen(port, (err) => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:${port}`)
//   })
// })

// const connectToMongoDb = (uri: string, options: mongoose.ConnectionOptions) => {
//   mongoose.connect(uri, options);
//   // plug in the promise library:
//   mongoose.Promise = global.Promise;

//   mongoose.connection.on('error', (err) => {
//       console.error(`Mongoose connection error: ${err}`);
//       process.exit(1);
//   });

//   mongoose.connection.once('open', function() {
//       console.info('MongoDB is connected');
//   });

//   return mongoose.connection;
// }

// const startup = () => {
//   console.info('Starting application');
//   let connectionString: mongoose.Connection = null;        
//   try {
//       console.info('Initializing database ...');
//       connectionString = connectToMongoDb(process.env.MONGODB_URI, options);
      
//   } catch (e) {
//     console.log(console.log('ERROR') )
//   }
// }

// export default {}

import express from 'express';
import next from 'next';
import mongoose from 'mongoose';


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0
}

const startDataBase = async () => {
  console.info('Starting application');
    let connectionString: mongoose.Connection = null;        
    try {
        console.info('Initializing database ...');
        connectionString = connectToMongoDb('mongodb+srv://max:max@cluster0.fedrw.mongodb.net/mydb', options);
    } catch (e) {
    }
}

app.prepare().then(() => {
  const server = express()

  startDataBase()
  connectToMongoDb

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})

const connectToMongoDb = (uri: string, options: mongoose.ConnectionOptions) => {
  mongoose.connect(uri, options);
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
      process.exit(1);
  });

  mongoose.connection.once('open', function() {
      console.info('MongoDB is connected');
  });

  return mongoose.connection;
}
