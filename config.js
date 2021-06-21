const merge = require('lodash/merge');

if (typeof document !== 'undefined') {
    throw new Error('Do not import `config.js` from inside the client-side code.');
}

const isDev = process.env.NODE_ENV !== 'production';

const prodConfig = {
    siteName: 'MyProjectName',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    dev: isDev,
    debug_mode: process.env.DEBUG_MODE,
    db: {
        uri: process.env.MONGO_URL || 'mongodb+srv://max:max@cluster0.fedrw.mongodb.net/mydb',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10,
            bufferMaxEntries: 0
        }
    },
    jwtSecret: 'fsnjbsjlk7845jkfdsd'
}

let localConfig = {};
if (isDev) {
    try {
        localConfig = require('./config.local.js');
    } catch (ex) {
        console.log('ex', ex)
        console.log('config.local does not exist.');
    }
}

module.exports = merge(prodConfig, localConfig);