const mongoose = require('mongoose');
const { ProductSchema } = require('./product')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String, required: true, trim: true
    },
    email: {
        type: String, required: true,
        validate: {
            validator: (value) => {
                let rt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                return value.match(rt);
            },
            message: 'email is not valid!'

        }
    },
    password: { type: String, required: true },
    address: {
        type: String, required: true
    },
    type: { type: String, default: 'user' },
    // cart: {
    //     items: [
    //         {
    //             productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    //             quantity: { type: Number, required: true }
    //         }
    //     ]
    // }
    cart: [
        {
            product: ProductSchema,
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],


})



// UserSchema.methods.addCart = function (product) {
//     // console.log(product);
//     const cartProductIndex = this.cart.findIndex(cp => {
//         return cp.productId.toString() === product.id.toString()

//     });
//     let newQuantity = 1;
//     const updateCartItems = [...this.cart];
//     if (cartProductIndex >= 0) {
//         newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//         updateCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//         updateCartItems.push({
//             productId: product.id,
//             quantity: newQuantity
//         })
//     }
//     const updateCart = {
//         items: updateCartItems
//     }
//     this.cart = updateCart;
//     return this.save();

// }
const User = mongoose.model('User', UserSchema);
module.exports = { User, UserSchema };