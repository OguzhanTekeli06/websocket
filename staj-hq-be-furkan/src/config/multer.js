const {error} = require("console")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "src/uploads")
    },
    filename: function(req, file, cb) {
        cb(null , file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
       file.mimetype == "application/vnd.ms-excel") {
        cb(null , true);
       }
    else {
        cb(new Error("Sadece excel dosyası yüklenebilir!"), false)
    }
}

const upload = multer({storage : storage , fileFilter: fileFilter})


module.exports = upload