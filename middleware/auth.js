const User = require('../database/models/User')

module.exports = (req, res, next) => {
  
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            console.log(user);
            // return res.redirect('/');
        
        }

        next()
    })
}