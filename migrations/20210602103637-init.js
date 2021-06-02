module.exports = {
  async up(db, client) {
    const faker = require('faker')
    const bcrypt = require('bcrypt')
    const mongoose = require('mongoose')

    const SALT_WORK_FACTOR = 10;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    const users = []
    const products = []
    const categories = []

    categories.push({
      _id : mongoose.Types.ObjectId(),
      name : "Casual",
      description : "Casual description"
    })

    categories.push({
      _id : mongoose.Types.ObjectId(),
      name : "Truck",
      description : "Truck description"
    })

    categories.push({
      _id : mongoose.Types.ObjectId(),
      name : "No top",
      description : "No top description"
    })

    categories.push({
      _id : mongoose.Types.ObjectId(),
      name : "Electro car",
      description : "Electro description"
    })

    for (let i = 0; i < 100; i++) {
      const productID = mongoose.Types.ObjectId()
      const userID = mongoose.Types.ObjectId()

      users.push({
        "_id": userID,
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
        "_id": mongoose.Types.ObjectId(),
        "user": userID,
        "mark": faker.datatype.number({ 'min': 1, 'max': 5 }),
        "text": faker.lorem.text()
      })

      products.push({
        "_id": productID,
        "user": userID,
        "categories": [categories[faker.datatype.number({'min': 0, 'max' : 3})]._id, categories[faker.datatype.number({'min': 0, 'max' : 3})]._id],
        "reviews": reviews,
        "name": faker.vehicle.model(),
        "price": faker.commerce.price(),
        "color": faker.commerce.color(),
        "description": faker.lorem.sentence(),
        "transmission": transmission[faker.datatype.number({ 'min': 0, 'max': 1 })],
        "engine": engine[faker.datatype.number({ 'min': 0, 'max': 2 })],
        "image": "https://robohash.org/".concat(faker.vehicle.model()),
        "featured": faker.datatype.boolean()
      })
    }

    db.collection('products').insertMany(products)
    db.collection('users').insertMany(users)
    db.collection('categories').insertMany(categories)
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};