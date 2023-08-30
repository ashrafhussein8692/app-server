// const multer = require('multer');

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + "-" + file.originalname);
//     }
// });
// const fileFilter = (req, file, cb) => {

//     if (file.mimetype === "image/png " || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
//         cb(null, true);
//     } else {
//         cb(null, true);
//     }
//     // const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

//     // if (!allowedTypes.includes(file.mimetype)) {
//     //   const error = new Error('Invalid file type');
//     //   error.code = 'INVALID_FILE_TYPE';
//     //   return cb(error, false);
//     // }


// }


// // Create the multer instance
// const upload = multer({ storage: storage, fileFilter: fileFilter });

// module.exports = upload;