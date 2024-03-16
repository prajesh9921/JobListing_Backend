const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/user');

const Verify = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        // We can use cookies token no need to manually pass the token
        // const token = req.cookies.token;
        // We add bearer infront of the token
        // It signifies that the token is being sent as part of the Authorization header in an HTTP request.
        // It signals to the server that the request should be authenticated using the provided token.
        
        if (!token) {
            res.status(401).json({message: "Unauthorized Access"});
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        // This is payload inside of decode. Another security factor for access
        const isUserValid = User.findById(decode.id);

        if (!isUserValid) {
            res.status(401).json({message: "Unauthorized Access"});
        }
        next();
    } catch (err) {
        console.log("Error while verifying token",err);
    }
}

module.exports = Verify;