const { Post } = require('../models/Post');
const express = require('express');
const router = express.Router();
require('dotenv/config');


//get latest Post 
router.get('/',async (req, res) => {

    const lastUpdate = await  Post.find({},{_id: 0,date: 1 ,event: 1}).sort({$natural:-1}).limit(1);

    if (!lastUpdate) {
        res.status(500).json({ success: false })
        console.log('error')
    }
    res.send(lastUpdate);

})

module.exports = router;