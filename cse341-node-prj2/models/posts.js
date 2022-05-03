const { Timestamp } = require('bson');
const { stringify } = require('json5');
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
    immutable: true,
    required: true
  },
  tags: {
    type: [String],
  },
  images: {
    data: Buffer,
    contentType: String
},
  comments: [{
    user: String,
    content: String,
    dateCommented: { type: Date, defaults: () => Date.now() },
  }]
});

module.exports = mongoose.model('posts',PostSchema);