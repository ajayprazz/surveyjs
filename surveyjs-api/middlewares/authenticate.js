const jwt = require('jsonwebtoken');
const config = require('./../config');
const db = require('./../config/db');

module.exports = (req, res, next) => {
    let token;
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    }
    if (req.headers.token) {
        token = req.headers.token;
    }
    if (req.query.token) {
        token = req.query.token;
    }
    if (token) {
        jwt.verify(token, config.app.jwtSecret, (err, decoded) => {
            if (err) {
                return next(err);
            }
            if (decoded) {
                db.query('SELECT * FROM users WHERE id = ?', decoded.id, (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    if (results.length > 0) {
                        req.loggedInUser = results[0];
                        next();
                    } else {
                        res.status(400).json({
                            message: 'user not found'
                        })
                    }
                })
            } else {
                res.status(400).json({
                    message: 'token expired or verification failed`'
                });
            }
        });
    } else {
        res.status(400).json({
            message: 'token not provided'
        });
    }
}