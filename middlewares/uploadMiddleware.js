const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { FILE_DIR } = require("../constants");

const createUploadMiddleware = (joiSchema) => {
  const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(FILE_DIR));
    },
    filename: (req, file, cb) => {
      const [_, exension] = file.originalname.split(".");
      cb(null, `${uuidv4()}.${exension}`);
    },
    limits: {
      fileSize: 2048,
    },
  });
  const uploadMiddleware = multer({
    storage: multerConfig,
    fileFilter(req, file, cb) {
      const { error } = joiSchema.validate(req.body);
      cb(null, !error);
    },
  });

  return uploadMiddleware;
};

module.exports = createUploadMiddleware;
