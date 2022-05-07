const createError = require('http-errors');
const Posts = require('../models/posts');

// Get all posts
const get_posts = async (req, res) => {
    try{
        const posts = await Posts.find();
        res.json(posts)
    } catch(err){
        res.json({message:err});
    };
};

// Get specific post
const get_post_by_id = async (req, res) => {
    try{
    const posts = await Posts.findById(req.params.postId);
    // if (posts) {
    //     res.status(200).json(posts);
    // } else {
    //     res.status(404).json({message: 'No valid entry found for provided ID'});
    // };
    res.json(posts);
    } catch(err){
        console.log(err);
        res.json({message:err});
    };
};

// Get all posts by specific user
// const get_users_posts = async (req, res) => {
//     try{
//     const posts = await Posts.find(req.params.user);
//     res.json(posts);
//     } catch(err){
//         res.json({message:err});
//     };
// };

// Create new post
const new_post = async (req, res) => {
    const post = new Posts({
        description: req.body.description,
        user: req.body.user,
        location: req.body.location,
        datePosted: req.body.datePosted,
        tags: req.body.tags,
        images: req.body.images,
        photoDescription: req.body.photoDescription
    });
    try {
        const newPost = await post.save();
        res.json(newPost);
    } catch (err) {
        res.json({ message: err });
    }
};

const updatePost = async (req, res) => {
    try{
        const updatedPost = await Posts.findById(req.params.PostId);

        if (req.body.description) {
            contact.description = req.body.description
        };

        if (req.body.user) {
            contact.user = req.body.user
        };

        if (req.body.location) {
            contact.location = req.body.location
        };

        if (req.body.datePosted) {
            contact.datePosted = req.body.datePosted
        };

        if (req.body.tags) {
            contact.tags = req.body.tags
        };

        if (req.body.images) {
            contact.images = req.body.images
        };

        if (req.body.photoDescription) {
            contact.photoDescription = req.body.photoDescription
        };

        await updatedPost.save();
        res.send(updatedPost);

    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist." });
    }
};

const deletePost = async (req, res) => {
    try{
        const deletedPost = await Posts.deleteOne({_id: req.params.postId});
        res.json(deletedPost);
        } catch(err){
            res.json({message:err});
        };
    };

module.exports = { 
    get_posts,
    get_post_by_id,
    deletePost,
    updatePost,
    // get_users_posts,
    new_post
};