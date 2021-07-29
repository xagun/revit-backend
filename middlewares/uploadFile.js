const multer = require("multer");
const path = require("path");

const myStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads/files"));
  },
});

var uploadFile = multer({
storage: myStorage
});
module.exports = uploadFile;
