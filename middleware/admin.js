const { promisify } = require('util')
const jwb = require('jsonwebtoken');
const User = require('../models/user');
const AdminAuth = (async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ msg: "Not Authorization!" })
        }
        const decoded = await promisify(jwb.verify)(token, process.env.JWT_SECRET_TOKEN);
        // console.log(decoded);
        if (!decoded) {
            return res.status(401).json({ msg: " Bad token" });
        }
        const user = await User.findById(decoded.id);
        if (user.type == "user" || user.type == "seller") {
            return res.status(401).json({ msg: "Access denide, you are not a admin" })
        }
        req.user = decoded.id;
        req.token = token;
        next();
    } catch (e) {

        return res.status(500).json({ error: e.message })
    }
});



module.exports = AdminAuth;
