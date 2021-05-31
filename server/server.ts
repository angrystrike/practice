import mongoose from 'mongoose'


const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, 
  bufferMaxEntries: 0
}

const startDatabase = () => {
  connectToMongoDb(process.env.MONGODB_URI, options)
  startup
}

app.prepare().then(() => {
  startDatabase()
  const server = express()

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
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

const startup = () => {
  console.info('Starting application');
  let connectionString: mongoose.Connection = null;        
  try {
      console.info('Initializing database ...');
      connectionString = connectToMongoDb(process.env.MONGODB_URI, options);
  } catch (e) {
      console.log('ERROR') 
  }
}

export default {}
