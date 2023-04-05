const { FuturePost } = require('../models/FutureEvents');
const express = require('express');
const router = express.Router();
require('dotenv/config');
 

// const admin = require("firebase-admin");
// const serviceAccount = require("../path/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


// const sendNotification = async (message) => {
//   try {
//     const response = await admin.messaging().send(message);
//     console.log(`Successfully sent notification: ${response}`);
//   } catch (error) {
//     console.log(`Error sending notification: ${error}`);
//   }

// };


//add new post according to the catogory 
router.post('/post/', async (req, res) => {
  let newspost = new FuturePost({

    event: req.body.event,
    type: req.body.type,
    gender: req.body.gender,
    location: req.body.location,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    image: req.body.image,

  })

  newspost = await newspost.save();

  if (!newspost)
    return res.status(400).send('the new post cannot be add!')

  // const message = {
  //   notification: {
  //     title: "New Event Added",
  //     body: "Check out the latest Event on our app!",
  //   },
  //   android: {
  //     notification: {
  //       sound: "default",
  //     },
  //   },
  //   topic: "new_Event",
  // };

  // await sendNotification(message);
  res.send(newspost);
})

// Get all FuturePost 
router.get(`/`, async (req, res) => {

  const postList = await FuturePost.find().sort({ $natural: -1 });

  if (!postList) {
    res.status(500).json({ success: false })
  }
  res.send(postList);
})


//get specific Post by id
router.get(`/:id`, async (req, res) => {
  const post = await FuturePost.findById(req.params.id);

  if (!post) {
    res.status(500).json({ success: false })
  }

  res.send(post);

})

//get latest Post 
router.get(`/latest/`, async (req, res) => {

  const post = await FuturePost.find().sort({ "datetime": -1 }).limit(1);

  if (!post) {
    res.status(500).json({ success: false })
    console.log('error')
  }



  res.send(post);

})


//update the student
router.put('/update/:id', async (req, res) => {


  const post = await FuturePost.findByIdAndUpdate(
    req.params.id,
    {
      event: req.body.event,
      type: req.body.type,
      gender: req.body.gender,
      location: req.body.location,
      description: req.body.description,
      time: req.body.time,
      date: req.body.date,
      image: req.body.image,
    },
    { new: true }  // to get the updated data 
  )

  if (!post)
    return res.status(400).send('The post cannot be edit!')

  res.send(post);
})


//delete the post
router.delete('/delete/:id', (req, res) => {

  console.log(req.params.id);
  FuturePost.findByIdAndRemove(req.params.id).then(post => {
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