const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  description: {
    type: String,
    // required: true
  },
  user: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  datePosted: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  tags: {
    type: [String]
  },
  images: {
    type: [String] // ultimately want to store photo location - perhaps use aw3? for photo storage and just store a url
},
  photoDescription: {
    type: String,
     }
});

module.exports = mongoose.model('posts',PostSchema);