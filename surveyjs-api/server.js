var express = require("express");
var bodyParser = require("body-parser");

var config = require('./config');

var app = express();

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const surveyRoute = require('./controllers/survey')();
const authRoute = require('./controllers/auth')();
const userRoute = require('./controllers/user')();

const authenticate = require('./middlewares/authenticate');
const authorize = require('./middlewares/authorize');

app.use('/auth', authRoute);
// app.use('/', authenticate, authorize, surveyRoute);
app.use('/survey', surveyRoute);
app.use('/user', userRoute);
app.use(express.static(__dirname + "/public"));

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        message: err.message || err
    })
})

app.listen(process.env.PORT || config.app.port, function () {
    console.log("Listening! at port ", process.env.PORT || config.app.port);
});