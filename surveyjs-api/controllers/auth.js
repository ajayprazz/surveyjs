var express = require("express");
var router = express.Router();

var db = require("../config/db");

var bcrypt = require("bcryptjs");
const saltRounds = 10;

var jwt = require("jsonwebtoken");

var config = require('./../config');

var nanoid = require("nanoid");

module.exports = function () {
    router.route("/register").post(function (req, res, next) {

        const today = new Date();

        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) {
                return next(err);
            }
            const users = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                created_At: today,
                updated_At: today
            };

            //1-admin 2-user(default)
            if (req.body.role) {

                users.role = req.body.role;
            } else {
                // req.body.role = 2;
                users.role = 2;
            }

            db.query("INSERT INTO users SET ?", users, (err, result) => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    data: result,
                    message: "user registered successfully"
                });
            });
        });
    });

    router.route('/login')
        .post((req, res, next) => {
            const email = req.body.email;
            const password = req.body.password;

            db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
                if (err) {
                    return next(err);
                }
                if (results.length > 0) {
                    const user = results[0];
                    bcrypt.compare(password, user.password, (err, matched) => {
                        if (matched) {
                            const token = jwt.sign({
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }, config.app.jwtSecret)
                            res.status(200).json({
                                token: token,
                                user: user
                            })
                        } else {
                            res.status(400).json({
                                message: 'invalid email or password'
                            })
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'invalid email or password'
                    })
                }
            })

        })

    return router;
};