const path = require("path");
const Post = require("../database/models/Post");

module.exports = (req, res) => {
  const { image } = req.files;
  console.log(req.params);
  image.mv(
    path.resolve(__dirname, "..", "public/posts", image.name),
    (error) => {
      Post.create(
        {
          ...req.body,
          userId: req.params.userId,
          image: `/posts/${image.name}`,
        },
        (error, post) => {
          res.redirect("/");
        }
      );
    }
  );
};
