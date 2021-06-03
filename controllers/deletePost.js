const path = require('path')
const Post = require('../database/models/Post')

module.exports = async (req, res) => {
  console.log(req.params.id);
  console.log("meow");
  try {
    let de = await Post.deleteOne({"_id" : req.params.id});
    console.log(de);
    res.redirect("/");
      
  } catch (error) {
    console.log(error);

  }


}