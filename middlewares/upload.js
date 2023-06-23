const multer = require("multer");
const path = require("path");

const destination = path.resolve("temp");
console.log(destination);

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const { _id: id } = req.user;
    const newName = id + file.originalname;
    cb(null, newName);
  },
});

const upload = multer({ storage });

module.exports = upload;
