import mongoose from 'mongoose'

const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://max:max@cluster0.fedrw.mongodb.net/mydb'

const users = require('./routes/user')
const categories = require('./routes/category')
const products = require('./routes/product')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0
}

const startDatabase = async () => {
  connectToMongoDb(MONGODB_URI, options)
  startup()
}

app.prepare().then(() => {
  startDatabase()
  const server = express()

  // server.use(bodyParser.json())
  // var jsonParser = bodyParser.json()
  server.use(bodyParser.json())
  server.use('/users', users)
  server.use('/categories', categories)
  server.use('/products', products)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

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
    connectionString = connectToMongoDb(MONGODB_URI, options);

  } catch (e) {
    console.log('ERROR')
  }
}

export const successResult = (res, result, message) =>{
  const resObj: any ={
      success : true,
      message : message,
      data : result
  }
  
  if(message && message !== "")
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
