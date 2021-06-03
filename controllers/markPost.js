

const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    console.log(req.params.id)
    const post = await Post.updateOne({"_id" : req.params.id }, {"helped" : true},{ upsert: true });
    res.redirect("/");
}
