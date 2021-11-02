const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const multer = require("multer");
const validateProduct = require("../middleware/validateProduct");
const checkAuth = require("../middleware/checkAuth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = async (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 8 },
  fileFilter: fileFilter,
});

router.get("/getAllproducts", productsController.getAllProducts);
router.post(
  "/addProduct",
  upload.single("file"),
  checkAuth,
  validateProduct,
  productsController.addProduct
);

module.exports = router;
