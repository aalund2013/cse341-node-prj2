const Posts = require('../models/posts');
const { ObjectId } = require("mongodb")

// Get all posts
const get_posts = async (req, res) => {
    // #swagger.tags = ['Posts']
    try{
        const posts = await Posts.find(); //.select('_id description user'); // select specific fields to be returned
        res.status(200).json(posts)
    } catch(err){
        res.json({message:err});
    };
};

// Get specific post
const get_post_by_id = async (req, res, next) => {
    // #swagger.tags = ['Posts']
    try{
    const posts = await Posts.findById(req.params.postId);
        if (!posts) {
            res.status(404).send({ error: "Post doesn't exist." });
        } else {
        res.json(posts)};
    } catch(err){
        res.status(404);
        res.send({ error: "Post doesn't exist." });
    };
};

// Get all posts by specific user
// #swagger.tags = ['Posts']
const get_users_posts = async (req, res) => {
    try{
    const posts = await Posts.find( {"user": req.params.user} );
    res.json(posts);
    } catch(err){
        res.json({message:err});
    };
};

// Create new post
const new_post = async (req, res) => {
    // #swagger.tags = ['Posts']
    const post = new Posts({
        description: req.body.description,
        user: req.body.user,
        location: req.body.location,
        // datePosted: req.body.datePosted,
        tags: req.body.tags,
        images: req.body.images,
        photoDescription: req.body.photoDescription
    });
    try {
        const newPost = await post.save();
        res.status(200).json(
            { message: 'Post successful!',
            results: newPost
            });
    } catch (err) {
        res.json({ message: err });
    }
};

const updatePost = async (req, res) => {
    // #swagger.tags = ['Posts']
    try{
        const updatedPost = await Posts.findById(req.params.postId);
        
        if (req.body.description) {
            updatedPost.description = req.body.description
        };

        // if (req.body.user) {
        //     updatedPost.user = req.body.user
        // };

        if (req.body.location) {
            updatedPost.location = req.body.location
        };

        // if (req.body.datePosted) {
        //     updatedPost.datePosted = req.body.datePosted
        // };

        if (req.body.tags) {
            updatedPost.tags = req.body.tags
        };

        if (req.body.images) {
            updatedPost.images = req.body.images
        };

        if (req.body.photoDescription) {
            updatedPost.photoDescription = req.body.photoDescription
        };

        await updatedPost.save(function (err) {
            if (err) {
                res.status(500)
                .json(err || 'An error occurred while updating');
            } else {
                res.status(204).send(updatedPost);
            }
        });
        // res.send(updatedPost);

    } catch(err) {
        console.log(err.stack)
        res.json({message:"error: " + err});
        // res.status(404);
        // res.send({ error: "Post doesn't exist." });
    }
};

const deletePost = async (req, res) => {
    // #swagger.tags = ['Posts']
    try{
        const deletedPost = await Posts.deleteOne({_id: req.params.postId});
        res.json({ message: "Successfully deleted post",
                    details: deletedPost });
        } catch(err){
            res.status(404);
            res.send({ error: "Post doesn't exist." });
            // res.json({message:err});
        };
    };

module.exports = { 
    get_posts,
    get_post_by_id,
    deletePost,
    updatePost,
    get_users_posts,
    new_post
};