const { Post } = require('../models/PastEvents');
const { FuturePost } = require('../models/FutureEvents');
const { Notes } = require('../models/Notes'); 
const express = require('express');
const router = express.Router();
require('dotenv/config');

// get latest Post, FuturePost, and Notes update date
router.get('/', async (req, res) => {
  try {
    const [latestPost, latestFuturePost, latestNote] = await Promise.all([
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
      ]),
      Notes.aggregate([
        {
          $group: {
            _id: null,
            latestUpdate: { $max: '$date' }
          }
        }
      ])
    ]);

    // find the latest update date between Post, FuturePost, and Notes
    let latestUpdate = null;

    if (latestPost.length > 0 && latestFuturePost.length > 0 && latestNote.length > 0) {
      latestUpdate = new Date(Math.max(latestPost[0].latestUpdate, latestFuturePost[0].latestUpdate, latestNote[0].latestUpdate));
    } else if (latestPost.length > 0 && latestFuturePost.length > 0) {
      latestUpdate = new Date(Math.max(latestPost[0].latestUpdate, latestFuturePost[0].latestUpdate));
    } else if (latestPost.length > 0 && latestNote.length > 0) {
      latestUpdate = new Date(Math.max(latestPost[0].latestUpdate, latestNote[0].latestUpdate));
    } else if (latestFuturePost.length > 0 && latestNote.length > 0) {
      latestUpdate = new Date(Math.max(latestFuturePost[0].latestUpdate, latestNote[0].latestUpdate));
    } else if (latestPost.length > 0) {
      latestUpdate = latestPost[0].latestUpdate;
    } else if (latestFuturePost.length > 0) {
      latestUpdate = latestFuturePost[0].latestUpdate;
    } else if (latestNote.length > 0) {
      latestUpdate = latestNote[0].latestUpdate;
    }

    if (latestUpdate !== null) {
      res.send({ latestUpdate });
    } else {
      res.status(404).json({ message: 'No updated times found' });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
