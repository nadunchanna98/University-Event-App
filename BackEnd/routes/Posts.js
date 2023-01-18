const { Post } = require('../models/Post');
const express = require('express');
const router = express.Router();
require('dotenv/config');


// Get all Post
router.get(`/`, async (req, res) => {

    const postList = await Post.find().sort({$natural:-1}) ;

    if (!postList) {
        res.status(500).json({ success: false })
    }
    res.send(postList);
})


//get specific Post by id
router.get(`/:id`, async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(500).json({ success: false })
    }
    res.send(post);

})


//add new post according to the catogory 
router.post('/post/', async (req, res) => {
    let newspost = new Post({

        event: req.body.event,
        type: req.body.type,
        gender: req.body.gender,
        firstN: req.body.firstN,
        secondN: req.body.secondN,
        thirdN: req.body.thirdN,
        firstT: req.body.firstT,
        secondT: req.body.secondT,
        thirdT: req.body.thirdT,
        description: req.body.description,
        date: req.body.date,
        image: req.body.image,

    })

    newspost = await newspost.save();

    if (!newspost)
        return res.status(400).send('the new post cannot be add!')

    res.send(newspost);
})


//update the student
router.put('/update/:id', async (req, res) => {


    const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
            event: req.body.event,
            type: req.body.type,
            gender: req.body.gender,
            firstN: req.body.firstN,
            secondN: req.body.secondN,
            thirdN: req.body.thirdN,
            firstT: req.body.firstT,
            secondT: req.body.secondT,
            thirdT: req.body.thirdT,
            description: req.body.description,
            date: req.body.date,
            image: req.body.image
        },
        { new: true }  // to get the updated data 
    )

    if (!post)
        return res.status(400).send('the post cannot be edit!')

    res.send(post);
})


//delete the post
router.delete('/delete/:id', (req, res) => {

    Post.findByIdAndRemove(req.params.id).then(post => {
        if (post) {
            return res.status(200).json({ success: true, message: 'post is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "post is not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})


module.exports = router;

/*
           { 

            "image": "https://www.thepapare.com/wp-content/uploads/6d283a0eb007683e94c72317741975ae-1.jpg",
            "event": "Running",
            "gender": "Male",
            "type" : "singles",
            "firstN": "nuwan kumarasinghe ",
            "secondN": "kasun bandara",
            "thirdN": "saman nirmala",
            "firstT": "E-19",
            "secondT": "E-18",
            "thirdT": "E-20",
            "date": "2023-01-07 14:40:50",
            "description": "The most hard FIFA ever"
  
            }
        

*/