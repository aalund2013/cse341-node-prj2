const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
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
    type: [String]
},
  photoDescription: {
    type: String,
     }
});

module.exports = mongoose.model('posts',PostSchema);