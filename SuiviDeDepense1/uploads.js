const multer = require('multer');
const { storage } = require("./filesystem");
const upload = multer({ storage: storage });
module.exports = upload