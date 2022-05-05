var posts = require('../controllers/posts');
var router = require('express').Router();

// GET ALL POSTS
router.get("/", posts.get_posts);

// GET SPECIFIC POST
router.get("/:postId", posts.get_post_by_id)

// GET POST BY USER
// router.get("/:user", posts.get_users_posts)

// POST A NEW POST
router.post("/", posts.new_post)



module.exports = router;