const Posts = require('../models/posts');

const get_posts = async (req, res) => {
    try{
        const posts = await Posts.find();
        res.json(posts)
    } catch(err){
        res.json({message:err});
    };
};

const get_post_by_id = async (req, res) => {
    try{
    const posts = await Posts.findById(req.params.postId);
    res.json(posts);
    } catch(err){
        res.json({message:err});
    };
};

const get_users_posts = async (req, res) => {
    try{
    const posts = await Posts.find(req.params.user);
    res.json(posts);
    } catch(err){
        res.json({message:err});
    };
};

const new_post = async (req, res) => {
    const post = new Posts({
        description: req.body.description,
        user: req.body.user,
        location: req.body.location,
        datePosted: req.body.datePosted,
        tags: req.body.tags,
        images: req.body.images,
        photoDescription: req.body.photoDescription
    })
}

module.exports = { 
    get_posts,
    get_post_by_id,
    get_users_posts,
    new_post
};