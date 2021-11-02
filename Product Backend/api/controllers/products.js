const Product = require("../models/products");

let address = "http://localhost:6005/";
module.exports.getAllProducts = (req, res, next) => {
  Product.find()
    .populate("created_by")
    .exec()
    .then((products) => {
      res.status(200).json({
        products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
module.exports.addProduct = (req, res) => {
  const { briefDescription, detailedDescription, price, originalPrice, link } =
    req.body;
  const newModel = new Product({
    briefDescription,
    detailedDescription,
    price,
    originalPrice,
    link,
    productImage: address.concat(req.file.path),
    created_by: req.userData._id,
  });

  newModel
    .save()
    .then((SavedObject) => {
      res.status(201).json({
        message: "Product saved successfully",
        SavedObject: SavedObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
