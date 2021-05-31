
module.exports = {
  async up(db, client) {
    var faker = require('faker')
    var bcrypt = require('bcrypt')
    const SALT_WORK_FACTOR = 10;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    const users = []
    const products = []

    for (let i = 1; i < 100; i++) {
      const productID = faker.datatype.uuid()
      users.push({
        "_id": i,
        "products": [productID],
        "email": faker.internet.email(),
        "firstName": faker.name.firstName(),
        "lastName": faker.name.lastName(),
        "role": "user",
        "password": await bcrypt.hash(faker.internet.password(), salt),
        "image": "https://robohash.org/".concat(faker.internet.password())
      }) 

      const transmission = ["automat", "manual"]
      const engine = ["gas", "fuel", "electricity"]
      
      const reviews = []

      reviews.push({
        "_id": faker.datatype.uuid(),
        "user": i,
        "mark": faker.datatype.number({ 'min': 1, 'max': 5 }),
        "text": faker.lorem.text()
      })

      products.push({
        "_id": productID,
        "user": i,
        "reviews": reviews,
        "name": faker.vehicle.model(),
        "price": faker.commerce.price(),
        "color": faker.commerce.color(),
        "transmission": transmission[faker.datatype.number({ 'min': 0, 'max': 1 })],
        "engine": engine[faker.datatype.number({ 'min': 0, 'max': 2 })]
      })
    }

    db.collection('users').insertMany(users)
    return db.collection('products').insertMany(products)
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
