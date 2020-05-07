const express = require('express');
const router = express.Router();
var mysqldbadapter = require('./../config/mysqldbadapter');

function getDBAdapter(req) {
    //var db = new dbadapter();
    var db = new mysqldbadapter;
    return db;
}

module.exports = () => {
    router.route('/:id')
        .get((req, res, next) => {
            const db = getDBAdapter(req);
            const userId = req.params.id;

            db.getUserById(userId, (result) => {
                res.status(200).json(result);
            })
        })

    return router;
}