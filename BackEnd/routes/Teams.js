const { Teams } = require('../models/Teams');
const express = require('express');
const router = express.Router();
require('dotenv/config');


// Get all Marks 
router.get(`/`, async (req, res) => {

    const MarkList = await Teams.find().sort({ $natural: -1 });

    if (!MarkList) {
        res.status(500).json({ success: false })
    }
    res.send(MarkList);
})

// Get total marks
router.get(`/total/`, async (req, res) => {

    const totalList = await Teams.find({},{_id: 0,total: 1 , team: 1}).sort({"total" : -1});

    if (!totalList) {
        res.status(500).json({ success: false })
    }
    res.send(totalList);
})


router.get(`/:id`, async (req, res) => {
    const marks = await Teams.findById(req.params.id);

    if (!marks) {
        res.status(500).json({ success: false })
    }
    res.send(marks);

})

// //get latest Post 
// router.get(`/latest/`, async (req, res) => {

//     const post = await FuturePost.find().sort({ "datetime": -1 }).limit(1);

//     if (!post) {
//         res.status(500).json({ success: false })
//         console.log('error')
//     }
//     res.send(post);

// })



//add marks 
router.post('/post/', async (req, res) => {
    let newMark = new Teams({

        team: req.body.team,
        teamID: req.body.teamID,
        total: req.body.total,
        description: req.body.description,
        recentAdded: req.body.recentAdded,

    })

    newMark  = await newMark.save();

    if (!newMark )
        return res.status(400).send('Mark cannot be add!')

    res.send(newMark);
})


//update the student
router.put('/update/:id', async (req, res) => {

    const marks = await Teams.findByIdAndUpdate(
        req.params.id,
        {
            total: req.body.total,
            description: req.body.description,
            recentAdded: req.body.recentAdded,
        },
        { new: true }  // to get the updated data 
    )

    if (!marks)
        return res.status(400).send('Marks cannot be edit!')

    res.send(marks);
})


//delete the post
router.delete('/delete/:id', (req, res) => {

    Teams.findByIdAndRemove(req.params.id).then(marks => {
        if (marks) {
            return res.status(200).json({ success: true, message: 'marks are deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "marks are not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})


module.exports = router;

// {
//     "team" : "E-19",
//     "teamID" : "2",
//     "total" : 100,
//     "description" : "This is the description",
//     "recentAdded" : "5"
// }