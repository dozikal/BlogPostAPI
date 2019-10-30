const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');


//Gets Back all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});


//Get a specific Post
router.get('/:postId', async (req, res) => {

    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err })
    }
});


//Submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });


    //This method uses a Promise
    /*
    post.save()
        .then(data=>{
            res.json(data)
        })
        .catch(err =>{
            res.json({message: err})
        })
    */

    //This methos uses Async/Await

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err })
    }

});


//Delete a specific post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json(removedPost);
    }
});


//Update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;