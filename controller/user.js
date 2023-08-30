
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../middleware/auth');
const { Product } = require("../models/product");




exports.postRegister = async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        const exisitUser = await User.findOne({ email: email });
        if (exisitUser) {
            return res.status(400).json({ msg: 'email is already exist' })
        }
        const hashPassword = await bcrypt.hash(password, 8);
        let newUser = new User({
            email, password: hashPassword, username, address
        })
        // const token = jwt.sign({ id: newUser._id }, 'keyPassword')
        await newUser.save();
        return res.status(200).json({
            status: "success",
            message: "Register done successfully",
            user: {
                newUser
            }
        })
    } catch (e) {
        res.status(500).json({ error: e.message })
        console.log(e.message);
    }


}



exports.postLogin = (async (req, res,) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User is not found!' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Password is not correct' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN);
        user.token = token;
        res.json(
            {
                status: 'success',
                message: 'Login done successfully',

                user: {
                    ...user._doc,
                    token,
                }
            }
        )
    } catch (e) {
        res.status(500).json({ erorr: e.message })
        console.log(e.message);
    }
});

exports.verfiyToken = (async (req, res) => {
    const user = await User.findById(req.user);
    console.log(user);
    console.log(req.user);
    res.json({ ...user._doc, token: req.token })
})

exports.addToCart = (async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        let user = await User.findById(req.user);
        if (user.cart.length == 0) {
            user.cart.push({ product, quantity: 1 })
        } else {
            let isProductFound = false;
            for (let i = 0; i < user.cart.length; i++) {
                if (user.cart[i].product._id.equals(product._id)) {
                    isProductFound = true;
                }
            }
            if (isProductFound) {
                let producttt = user.cart.find((productt) =>
                    productt.product._id.equals(product.id)
                );
                producttt.quantity += 1;
            } else {
                user.cart.push({ product, quantity: 1 })
            }
        }
        user = await user.save();
        res.status(200).json({
            status: 'success',
            message: 'Add To Cart Successfully',
            user: user
        });
    } catch (e) {
        res.status(500).json({ error: e.message })
        console.log(e.message);

    }

})

exports.deleteFromCart = (async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        let user = await User.findById(req.user);
        for (let i = 0; i < user.cart.length; i++) {
            if (user.cart[i].product._id.equals(product._id)) {
                if (user.cart[i].quantity == 1) {
                    user.cart.splice(i, 1)
                } else {
                    user.cart[i].quantity -= 1;
                }
            }

        }
        user = await user.save();
        return res.status(200).json({
            status: 'success',
            message: 'Deleted From Cart Successfully',
            user: user
        });
    } catch (e) {
        res.status(500).json({ erorr: e.message })
        console.log(e.message)
    }

})
exports.getCart = (async (req, res) => {
    try {
        const user = await User.findById(req.user);
        let product = (await user.populate()).cart;
         res.status(200).json({
            status: 'success',
            message: '',
            cart: product
        });
        console.log(product);
    } catch (e) {
        res.status(500).json({ erorr: e.message })
        console.log(e.message)
    }
})
