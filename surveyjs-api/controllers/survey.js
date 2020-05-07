const express = require('express');
const router = express.Router();
var mysqldbadapter = require('./../config/mysqldbadapter');
var nanoid = require('nanoid');

function getDBAdapter(req) {
    //var db = new dbadapter();
    var db = new mysqldbadapter;
    return db;
}

module.exports = () => {
    router.route('/getActive')
        .get((req, res, next) => {
            var db = getDBAdapter(req);
            db.getSurveys(function (result, error) {
                res.status(200).json(result);
            });
        })

    router.route('/getSurvey')
        .get((req, res, next) => {
            var db = getDBAdapter(req);
            var surveyId = req.query["surveyId"];

            db.getSurvey(surveyId, function (result) {
                res.status(200).json(result)
            });
        })

    router.route('/changeName')
        .get((req, res, next) => {
            var db = getDBAdapter(req);
            var id = req.query["id"];
            var name = req.query["name"];
            db.changeName(id, name, function (result) {
                res.status(200).json(result);
            });
        })

    router.route('/create')
        .get((req, res, next) => {
            var db = getDBAdapter(req);
            var name = req.query["name"];
            const id = nanoid();
            db.addSurvey(id, name, function (result) {
                res.status(200).json({
                    Name: result.name,
                    Id: result.id
                })
            });
        })

    router.route('/changeJson')
        .post((req, res, next) => {
            var db = getDBAdapter(req);
            var id = req.body.Id;
            var json = req.body.Json
            db.storeSurvey(id, json, function (result) {
                res.status(200).json(result.json);
            });
        })

    router.route('/post')
        .post((req, res, next) => {
            var db = getDBAdapter(req);
            const surveyId = req.body.surveyId;
            const userId = req.body.userId;
            const userIp = req.ip;
            const surveyResult = JSON.stringify(req.body.result);
            const obtainedScore = req.body.obtainedScore;
            const totalScore = req.body.totalScore;
            const startTime = req.body.startTime;
            const endTime = req.body.endTime;

            db.postResults(surveyId, userId, userIp, surveyResult, obtainedScore, totalScore, startTime, endTime, function (result) {
                res.status(200).json(result.json);
            });
        })

    router.route('/delete')
        .get((req, res, next) => {
            var db = getDBAdapter(req);
            var surveyId = req.query["id"];
            db.deleteSurvey(surveyId, function (result) {
                console.log('survey deleted', surveyId);
                res.status(200).json(result);
            });
        })

    router.route('/results')
        .get((req, res, next) => {
            var db = getDBAdapter(req);
            var surveyId = req.query["surveyId"];

            db.getResults(surveyId, function (result) {
                console.log('result', result);

                res.status(200).json(result);
            });
        })

    return router;
}