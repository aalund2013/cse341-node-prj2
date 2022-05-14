var users = require('../controllers/users');
var router = require('express').Router();

// GET ALL USERS
router.get("/", users.getUsers);

// GET SPECIFIC USER
router.get("/:userId", users.getUserById);

// POST A NEW USER
// router.post("/", users.newUser);

// DELETE USER
router.delete("/:userId", users.deleteUser);

// UPDATE USER
// router.patch("/:userId", users.updateUser);



module.exports = router;