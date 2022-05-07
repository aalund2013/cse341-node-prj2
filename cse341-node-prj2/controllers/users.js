const Users = require('../models/users');

// Get all posts
const getUsers = async (req, res) => {
    try{
        const users = await Users.find(); //.select('_id description user'); // select specific fields to be returned
        res.status(200).json(users)
    } catch(err){
        res.json({message:err});
    };
};

// Get specific post
const getUserById = async (req, res, next) => {
    try{
    const users = await Users.findById(req.params.userId);
        if (!users) {
            res.status(404).send({ error: "User doesn't exist." });
        } else {
        res.json(users)};
    } catch(err){
        res.status(404);
        res.send({ error: "User doesn't exist." });
    };
};

// Create new user
const newUser = async (req, res) => {
    const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        birthday: req.body.birthday,
        password: req.body.password
    });
    try {
        const newUser = await user.save();
        res.status(200).json(
            { message: 'User created!',
            results: newUser
            });
    } catch (err) {
        res.json({ message: err });
    }
};

const updateUser = async (req, res) => {
    try{
        const updatedUser = await Users.findById(req.params.UserId);

        if (req.body.firstName) {
            updatedUser.firstName = req.body.firstName
        };

        if (req.body.lastName) {
            updatedUser.lastName = req.body.lastName
        };

        if (req.body.email) {
            updatedUser.email = req.body.email
        };

        if (req.body.username) {
            updatedUser.username = req.body.username
        };

        if (req.body.groupsJoined) {
            updatedUser.groupsJoined = req.body.groupsJoined
        };

        if (req.body.birthday) {
            updatedUser.birthday = req.body.birthday
        };

        if (req.body.password) {
            updatedUser.password = req.body.password
        };

        await updatedUser.save();
        res.send(updatedUser);

    } catch(err) {
        res.json({message:err});
        // res.status(404);
        // res.send({ error: "User doesn't exist." });
    }
};

const deleteUser = async (req, res) => {
    try{
        const deletedUser = await Users.deleteOne({_id: req.params.userId});
        res.json({ message: "Successfully deleted user",
                    details: deletedUser });
        } catch(err){
            res.status(404);
            res.send({ error: "User doesn't exist." });
        };
    };

module.exports = { 
  getUsers,
  getUserById,
  newUser,
  updateUser,
  deleteUser
};