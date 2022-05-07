const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateJoined: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  groupsJoined: {
    type: [ObjectId]
    // , default: () => code to get groupIDs???
  },
  birthday: {
    type: Date,
    required: true
},
  password: {
    type: String,
    required: true
     }
});

module.exports = mongoose.model('users',UserSchema);