const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: [true, "you need to enter the name of product"],
  },
  price: {
    type: Number,
    required: [true, "you need to enter the amount of product"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    enum: {
      values: ['apple', 'samsung', 'dell', 'mi', 'hp'],
      message: `{VALUE} is not supported by this api. Thank-you 🙏.`
    }
  }
});

module.exports = mongoose.model("Products", productSchema);
