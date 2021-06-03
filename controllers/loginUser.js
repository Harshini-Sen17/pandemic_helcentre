const bcrypt = require('bcrypt')
const User = require('../database/models/User')
const url = require('url')
const Post = require('../database/models/Post')

module.exports = (req, res) => {
   
    const {
        email,
        password
    } = req.body;
    // try to find the user
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, async (error, same) => {
                if (same) {
                    const posts = await Post.find({});
                    req.session.userId = user._id;
                    console.log("in");
                    // 
                    res.redirect(url.format({
                        pathname:"/",
                        query: {
                            userId : user._id
                         }
                      }))
                } else {
                    res.redirect('/auth/login')
                }
            })
        } else {
            return res.redirect('/auth/login')
        }
    })
} 
