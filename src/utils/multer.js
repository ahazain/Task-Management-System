const multer = require("multer");

const storage = multer.memoryStorage();

const filter = (req, file, cb) => {
  const allowedMimeTypes = ["image/png", "application/pdf", "video/mp4"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    // check if file type is allowed
    cb(null, true); // accept file
  } else {
    cb(new Error("Only images, videos, and files are allowed"), false); // reject file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filter,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB
  },
});

module.exports = upload;
