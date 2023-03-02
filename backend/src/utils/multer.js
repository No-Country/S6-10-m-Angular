const multer = require('multer');

const storage = multer.memoryStorage();

// const upload = multer({ storage, fileFilter: () => {} });

const upload = multer({ storage });

module.exports = { upload };
