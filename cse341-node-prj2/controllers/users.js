const Users = require('../models/users');

// Get all posts
const getUsers = async (req, res) => {
    // #swagger.tags = ['Users']
    try{
        const users = await Users.find(); //.select('_id description user'); // select specific fields to be returned
        res.status(200).json(users)
    } catch(err){
        res.json({message:err});
    };
};

// Get specific post
const getUserById = async (req, res, next) => {
    // #swagger.tags = ['Users']
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
    // #swagger.ignore = true
    const user = new Users({
        googleId: req.body.googleId,
        displayName: req.body.displayName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image,
        createdAt: req.body.createdAt
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
    // #swagger.ignore = true
    try{
        const updatedUser = await Users.findById(req.params.userId);
        console.log(updatedUser)
        if (req.body.displayName) {
            updatedUser.firstName = req.body.firstName
        };

        if (req.body.firstName) {
            updatedUser.firstName = req.body.firstName
        };

        if (req.body.lastName) {
            updatedUser.lastName = req.body.lastName
        };

        if (req.body.image) {
            updatedUser.image = req.body.image
        };

        if (req.body.createdAt) {
            updatedUser.createdAt = req.body.createdAt
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
    // #swagger.tags = ['Users']
    try{
        const deletedUser = await Users.deleteOne({_id: req.params.googleId});
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