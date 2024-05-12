const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, Date.now() + "-" + path.extname(file.originalname))
    }
  })

  const filefilter = (req,file,cb)=>{
    console.log(file);
    let allowedfile = /pnj|jpg|jpeg|svg|webp|gif/
    let minetype = allowedfile.test(file.minetype)
    let extname = allowedfile.test(path.join(file.originalname).toLowerCase())
    if(extname && minetype){
      cb(null,true)
    }else{
      cb(`extension name is not correct pl try this ${allowedfile}`)
    }
  }
  
  const upload = multer({ storage: storage,filefilter:filefilter })

  module.exports = upload 