const path = require("path")
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null, 'uploads');
    },
    filename:(req,file,cb)=>{
      const picture = path.extname(file.originalname);
      cb(null, Date.now() + picture)
    }
  })
  
module.exports = {storage}

