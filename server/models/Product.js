const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    require: [true, 'Please provide id']
  },

  stock: {
    type: Number,
    require: [true, 'Please provide stock']
  },

  price: {
    type: Number,
    require: [true, 'Please provide price']
  },

  shipping: {
    type: String,
    require: [true, 'Please provide shipping']
  },

  colors: {
    type: [String],
    require: [true, 'Please provide colors']
  },

  category: {
    type: String,
    require: [true, 'Please provide category']
  },

  reviews: {
    type: Number,
    require: [true, 'Please provide reviews']
  },

  stars: {
    type: Number,
    require: [true, 'Please provide stars']
  },

  name: {
    type: String,
    require: [true, 'Please provide name']
  },

  description: {
    type: String,
    require: [true, 'Please provide description']
  },

  company: {
    type: String,
    require: [true, 'Please provide company']
  }
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)
