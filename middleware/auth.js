const jwt = require('jsonwebtoken');
const Auth = async (req, res, next) => {
    try {
    const token = req.header('authorization');
    // console.log(token);
    if (!token) {
        return res.status(401).json({ msg: 'Not authorization' })
    }
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
            if (!decoded) {
                 return res.json( { msg :'Bad Token!' })
            }
            req.user = decoded.id;
            req.token = token
            next();
        }
    } catch (e) {
       return res.status(401).json( { msg :e.message} )
    }

}
module.exports = Auth;