const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  briefDescription: {
    type: String,
  },
  detailedDescription: {
    type: String,
  },
  price: {
    type: Number,
  },
  originalPrice: {
    type: Number,
  },
  link: {
    type: String,
  },
  productImage: {
    type: String,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
});

module.exports = mongoose.model("productSchema", productSchema);
