const User = require("../models/user");
const { Product } = require("../models/product");
exports.getProduct = (async (req, res) => {
    try {
        const product = await Product.find({});

        return res.status(200).json({
            status: 'success',
            message: '',
            data: product
        });
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})
exports.getCategoryProduct = (async (req, res) => {
    try {
        const product = await Product.find({ category: req.query.category });

        return res.status(200).json({
            status: 'success',
            message: '',
            data: product
        });
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
})
exports.getSearch = (async (req, res) => {
    try {
        const product = await Product.find(
            {
                name: { $regex: req.params.name, $options: "i" }
            }

        )
        res.status(200).json({
            status: 'success',
            message: '',
            data: product
        });
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

exports.postRating = (async (req, res) => {
    try {
        const { id, rating } = req.body;
        let product = await Product.findById(id);

        for (let i = 0; i < product.ratings.length; i++) {
            if (product.ratings[i].userId == req.user) {
                product.ratings.splice(i, 1);
                break;
            }
        }
        const ratingSchema = {
            userId: req.user,
            rating,
        };
        product.ratings.push(ratingSchema);
        product = await product.save();
        return res.status(200).json({
            status: 'success',
            message: '',
            data: product
        });
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})
exports.getDeal = (async (req, res) => {
    try {
        let product = await Product.find({});
        product = product.sort((a, b) => {
            let aSum = 0;
            let bSum = 0;
            for (let i = 0; i < a.ratings.length; i++) {
                aSum += a.ratings[i].rating;
            }
            for (let i = 0; i < b.ratings.length; i++) {
                bSum += b.ratings[i].rating;
            }
            return aSum < bSum ? 1 : -1
        })
        return res.status(200).json({
            status: 'success',
            message: '',
            data: product
        });
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

