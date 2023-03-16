const { Post } = require('../models/PastEvents');
const { FuturePost } = require('../models/FutureEvents');
const express = require('express');
const router = express.Router();
require('dotenv/config');


// //get latest Post 
// router.get('/',async (req, res) => {

//     const lastUpdate = await  Post.find({},{_id: 0,date: 1 ,event: 1}).sort({$natural:-1}).limit(1);

//     if (!lastUpdate) {
//         res.status(500).json({ success: false })
//         console.log('error')
//     }
//     res.send(lastUpdate);

// })

// get latest Post and FuturePost update date
router.get('/', async (req, res) => {
    try {
      const [latestPost, latestFuturePost] = await Promise.all([
        Post.aggregate([
          {
            $group: {
              _id: null,
              latestUpdate: { $max: '$dateCreated' }
            }
          }
        ]),
        FuturePost.aggregate([
          {
            $group: {
              _id: null,
              latestUpdate: { $max: '$dateCreated' }
            }
          }
        ])
      ]);
  
      // find the latest update date between Post and FuturePost
      const latestUpdate = latestPost[0].latestUpdate > latestFuturePost[0].latestUpdate
        ? latestPost[0].latestUpdate
        : latestFuturePost[0].latestUpdate;
  
      res.send({ latestUpdate });
      console.log(latestUpdate);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  });

module.exports = router;