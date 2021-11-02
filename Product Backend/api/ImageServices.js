const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
    console.log("aaaaaaaaaaa");
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

const fs = require("fs");

const removeImagefile = (path) => {
  var dot = ".";
  var locate = path.search("/uploads");
  var address = path.substring(locate, path.length);
  address = dot.concat(address);
  try {
    fs.unlinkSync(address);
    console.log("File Removed");
  } catch (err) {
    console.error(err);
  }
};

module.exports.upload = upload;

module.exports.removeImagefile = removeImagefile;
