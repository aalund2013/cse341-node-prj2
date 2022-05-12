const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
// const bcrypt = require(bcryptjs);
const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // email: {
  //   type: String,
  //   trim: true,
  //   lowercase: true,
  //   unique: true,
  //   required: true,
  //   validate: [validateEmail, "please fill a valid email address"],
  //   match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //   "Please fill a valid email address", ],
  // },
  // username: {
  //   type: String,
  //   lowercase: true,
  //   unique: true,
  //   required: true
  // },
  // dateJoined: {
  //   type: Date,
  //   default: () => Date.now(),
  //   immutable: true
  // },
  // groupsJoined: {
  //   type: [ObjectId]
  //   // , default: () => code to get groupIDs???
  // },
  // birthday: {
  //   type: Date,
  //   required: true
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 8,
  // }
});

module.exports = mongoose.model('users',UserSchema);