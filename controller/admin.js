const {Product} = require("../models/product");
// const upload = require('../middleware/upload');
// const path = require('path');
// const multer = require('multer')
// const upload = multer()
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now());
//       }
//     // filename: function (req, file, cb) {
//     //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     //     cb(null, file.fieldname + '-' + uniqueSuffix)
//     // }
// })

// const upload = multer({ storage: storage })

exports.PostProduct = (async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const category = req.body.category;
        // const ratings = req.body.ratings;
        const images = req.body.images;

        let product = new Product({
            name: name, description: description, images: images, quantity: quantity, price: price, category: category,
        });
        product = await product.save();
        return res.status(200).json({
            status: 'success',
            message: 'Product Uploaded Successfully',
            data: product
        });

    } catch (e) {
        res.status(500).json({ error: e.message })
        // console.log(e)

    }
})
exports.getProduct = (async (req, res) => {
    try {
        const products = await Product.find({})

        res.status(200).json({
            status: 'success',
            message: 'true',
            data: products
        })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

})
exports.deleteProduct = ( async(req,res)=>{
    try {
        const {id} = req.body;
        let product = await Product.findByIdAndDelete(id);
        res.status(200).json(product)
    }catch (e){
        res.status(500).json({ error: e.message })
    }
    
})