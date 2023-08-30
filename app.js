const mongoose = require('mongoose');
const express = require('express');

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "images");
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date.now().toISOString() + "-" + file.originalname);
//     },
// });

// const fileFilter = (req, file, cb) => {
//     if (
//         file.mimetype === "images/png" ||
//         file.mimetype === "images/jpg" ||
//         file.mimetype === "images/jpeg"
//     ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config({ path: './config.env' });
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

const UserAdmin = require('./router/user');
const Admin = require('./router/admin');
const Product = require('./router/product');

app.use(UserAdmin);
app.use(Admin);
app.use(Product);

// app.use(UserAuth);



// app.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) { // Multer-specific errors
//         return res.status(418).json({
//             err_code: err.code,
//             err_message: err.message,
//         });
//     } else { // Handling errors for any other cases from whole application
//         return res.status(500).json({
//             err_code: 409,
//             err_message: "Something went wrong!"
//         });
//     }
// });


mongoose.connect("mongodb+srv://ashrafhussein8692:YDju4HFVatEhMzeu@cluster0.ae85bui.mongodb.net/shop?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected with database')
    }).catch(err => {
        console.log(err)
    })

app.listen(PORT, '0.0.0.0', () => {
    console.log('success')

})