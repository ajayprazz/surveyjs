const db = require('./db');

function MySQLDBAdapter() {

  function getObjectFromStorage(tableName, callback) {

    db.query("SELECT * FROM " + tableName, function (err, result) {
      if (err) console.log(err);
      // console.log(result);
      var objects = {};
      (result || []).forEach(function (item) {
        objects[item.id] = item;
      });
      callback(objects);
    });
  }

  function getUserById(id, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [id], function (err, result) {
      if (err) throw err;
      callback(result);
    })
  }

  function addSurvey(id, name, callback) {
    var sql = "INSERT INTO surveys (id,name, json) VALUES(?,?,?) ";
    db.query(sql, [id, name, "{}", 0], function (err, result) {
      if (err) throw err;
      db.query("SELECT * FROM surveys", function (err, result) {
        callback(result);
      });
    });
  }

  function postResults(surveyId, userId, userIp, surveyResult, obtainedScore, totalScore, startTime, endTime, callback) {
    var sql = "INSERT INTO results (surveyId,userId,userIp,surveyResult,obtainedScore,totalScore,startTime,endTime) VALUES(?,?,?,?,?,?,?,?) ";
    db.query(sql, [surveyId, userId, userIp, surveyResult, obtainedScore, totalScore, startTime, endTime], function (err, result) {
      if (err) {
        console.log('error', err);
        throw err;
      };
      db.query("SELECT * FROM results WHERE surveyId = ?", [surveyId], function (err, result) {
        callback(result);
      });
    });
  }

  function getResults(surveyId, callback) {

    db.query("SELECT * FROM results WHERE surveyId= ?", [surveyId], function (err, result) {
      // var results = (result || []).map(function (item) {
      //   return item["surveyResult"];
      // });
      var results = result || [];
      callback(results);
    });
  }

  function deleteSurvey(surveyId, callback) {
    var sql = "DELETE FROM surveys WHERE id = ?";
    db.query(sql, [surveyId], function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      callback(result);
      // db.query("SELECT * FROM surveys", function (err, result) {
      //   callback(result);
      // });
    });
  }

  function changeName(id, name, callback) {
    var sql = "UPDATE surveys SET name = ? WHERE id = ? ";
    db.query(sql, [name, id], function (err, result) {
      if (err) throw err;

      db.query("SELECT * FROM surveys WHERE id = ?", [id], function (err, result) {
        callback(result);
      });

    });

  }

  function storeSurvey(id, json, callback) {
    var sql = "UPDATE surveys SET json = ? WHERE id = ? ";
    db.query(sql, [json, id], function (err, result) {
      if (err) throw err;
      console.log("Number of records affected: " + JSON.stringify(result.affectedRows));
      db.query("SELECT * FROM surveys WHERE id = ?", [id], function (err, result) {
        callback(result);
      });
    });
  }

  function getSurveys(callback) {

    var surveys = {
      MySurvey1: {
        pages: [{
          name: "page1",
          elements: [{
            type: "radiogroup",
            choices: ["item1", "item2", "item3"],
            name: "question from survey1"
          }]
        }]
      },
      MySurvey2: {
        pages: [{
          name: "page1",
          elements: [{
            type: "checkbox",
            choices: ["item1", "item2", "item3"],
            name: "question from survey2"
          }]
        }]
      }
    };
    getObjectFromStorage("surveys", function (objects) {
      if (Object.keys(objects).length > 0) {
        callback(objects);
      } else {
        callback(surveys);
      }
    });
  }

  return {
    getUserById: getUserById,
    addSurvey: addSurvey,
    getSurvey: function (surveyId, callback) {
      getSurveys(function (result) {
        callback(result[surveyId]);
      });
    },
    storeSurvey: storeSurvey,
    getSurveys: getSurveys,
    deleteSurvey: deleteSurvey,
    postResults: postResults,
    getResults: getResults,
    changeName: changeName
  };
}

module.exports = MySQLDBAdapter;