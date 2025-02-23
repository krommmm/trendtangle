const multer = require("multer");
const path = require("path");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const fileInfo = path.parse(file.originalname);
        const name = fileInfo.name;
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${name}_${new Date().getTime()}.${extension}`);
    }
});

module.exports = multer({ storage: storage }).single("imgUrl");