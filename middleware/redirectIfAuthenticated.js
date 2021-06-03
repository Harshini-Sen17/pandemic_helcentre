const User = require('../database/models/User')

module.exports = (req, res, next) => {

    console.log(req.sessionID);

    if (req.session.userId) {
        console.log(req.session.userId);
        return res.redirect('/')
    }

    next()
}