const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: String,
  location: String,
  content: String,
  username: String,
  image: String,
  userId: String,
  contact: String,
  helped: {
    type: Boolean,
    default: false
  } ,
  tag: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post 
