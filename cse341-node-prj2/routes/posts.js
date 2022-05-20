var posts = require('../controllers/posts');
var router = require('express').Router();

// GET ALL POSTS
router.get("/", posts.get_posts);

// GET POST BY USER
router.get("/username/:user", posts.get_users_posts);

// GET SPECIFIC POST
router.get("/:postId", posts.get_post_by_id);

// POST A NEW POST
router.post("/", posts.new_post);

// DELETE POST
router.delete("/:postId", posts.deletePost);

// UPDATE POST
router.patch("/:postId", posts.updatePost);


module.exports = router;