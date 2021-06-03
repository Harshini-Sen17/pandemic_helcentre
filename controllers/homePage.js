const Post = require('../database/models/Post')

module.exports = async (req, res) => {
 
 
const posts = await Post.find({});
if(req.session.userId){

res.render("index", {
    posts,userId:req.session.userId
});
}
else{
    res.render("index", {
        posts
    });
}

}