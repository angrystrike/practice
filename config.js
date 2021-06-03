const config = {}

config.db = {}

config.db.uri = 'mongodb+srv://max:max@cluster0.fedrw.mongodb.net/mydb'

config.db.options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    bufferMaxEntries: 0
}

module.exports = config