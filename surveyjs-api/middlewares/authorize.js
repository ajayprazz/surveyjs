module.exports = (req, res, next) => {
    if (req.loggedInUser.role == 1) {
        return next();
    } else {
        res.status(400).json({
            msg: 'you are not authorised'
        });
    }
}