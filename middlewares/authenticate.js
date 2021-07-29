require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('./../configs');


module.exports = function(req, res, next){
    let token;
    if (req.headers['authorization'])
        token = req.headers['authorization']
    if (req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if (req.headers['token'])
        token = req.headers['token']
    if (req.query.token) {
        token = req.query.token
    }

    if (!token) {
        return next({
            msg: "Authentication Failed, Token Not Provided",
            status: 400
        })
    }
    jwt.verify(token, config.JWT_SECRET , function (err, user) {
        if (err) {
            return next(err);
        }
        req.user = user;
        next();
    })

}