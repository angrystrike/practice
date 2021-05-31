const createCollection = async (db) => {
  await db.createCollection('users', {
    validator: {
      $and: [
        { email: { $type: 'string' } },
        { firstName: { $type: 'string' } },
        { lastName: { $type: 'string' } },
        { password: { $type: 'string' } },
        { image: { $type: 'string' } },
      ],
    },
    validationAction: 'error',
    validationLevel: 'strict',
  })
}

module.exports = {
  async up(db, client) {
    try {
      const col = await db.listCollections({ name: 'users' }).toArray()
      if(col.length > 0) {
        throw new Error('Collection games already exists in MongoDb. Exited...')
      } else {
        await createCollection(db)
      }
    } catch(err) {
      throw err
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
