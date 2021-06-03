const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  var pattern = req.body.search;
  console.log(pattern);
  if(pattern.trim()){
  let posts = await Post.find({
    $or: [
      { location: RegExp(pattern, "i") },
      { title: RegExp(pattern, "i") },
      { tag: RegExp(pattern, "i") },
    ],
  });

  res.render("index", {
    posts
  });
} else{
  let posts = await Post.find({});
  res.render("index", {
    posts
  });
}
};
