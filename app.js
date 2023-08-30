const mongoose = require('mongoose');
const express = require('express');


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


mongoose.connect("mongodb+srv://ashrafhussein8692:YDju4HFVatEhMzeu@cluster0.ae85bui.mongodb.net/shop?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected with database')
    }).catch(err => {
        console.log(err)
    })

app.listen(PORT, '0.0.0.0', () => {
    console.log('success')

})