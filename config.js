const merge = require('lodash/merge');

if (typeof document !== 'undefined') {
    throw new Error('Do not import `config.js` from inside the client-side code.');
}

const isDev = process.env.NODE_ENV !== 'production';

const prodConfig = {
    siteName: 'MyProjectName',
    baseUrl: process.env.BASE_URL,
    dev: isDev,
    debug_mode: process.env.DEBUG_MODE,
    mongo: {
        uri: process.env.MONGO_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10,
            bufferMaxEntries: 0
        }
    },
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