const { Users } = require('../models/Users');
const express = require('express');
const router = express.Router();
require('dotenv/config');


// Get all users 
router.get(`/token/`, async (req, res) => {

    const UserList = await Users.find().sort({ $natural: -1 });

    if (!UserList) {
        res.status(500).json({ success: false })
    }
    res.send(UserList);
})


//check token is exist or not
router.get(`/token/:token`, async (req, res) => {
    const User = await Users.findOne({ token: req.params.token });

    if (!User) {
        return res.status(404).json({ success: false, message: 'Token not found.' });
    }
    res.json({ success: true, data: User });

})

//get by token
router.get(`/user/:token`, async (req, res) => {
    const User = await Users.findOne({ token: req.params.token });

    if (!User) {
        return res.status(404).json({ success: false, message: 'Token not found.' });
    }
    res.json({ success: true, data: User });

})






//add  
router.post('/user/', async (req, res) => {
    const token = req.body.token;
    const theme = req.body.theme;

    const user = await Users.findOne({ token });

    if (user) {
        return res.status(400).send('User token already exists!');
    }

    let newUser = new Users({ token , theme });

    newUser = await newUser.save();

    if (!newUser) {
        return res.status(400).send('User token cannot be added!');
    }

    res.send(newUser);
});


//change by token
router.put('/user/:token', async (req, res) => {

    const User = await Users.findOneAndUpdate(
        { token: req.params.token },
        {
            theme: req.body.theme,
        },
        { new: true }  // to get the updated data
    )

    if (!User)
        return res.status(400).send('User cannot be edit!')

    res.send(User);
    console.log(User);
})



//update the user
router.put('/token/:id', async (req, res) => {

    const User = await Users.findByIdAndUpdate(
        req.params.id,
        {
            total: req.body.total,
            description: req.body.description,
            recentAdded: req.body.recentAdded,
        },
        { new: true }  // to get the updated data 
    )

    if (!User)
        return res.status(400).send('User cannot be edit!')

    res.send(User);
})


//delete the post
router.delete('/token/:id', (req, res) => {

    Users.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: 'user deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "user not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})


module.exports = router;

// {
//     "token" : "vgayuascyuascyuascuascuscscascasuasc",
//     "userID" : "fyascuci4515141414811casaaacacasca45"
// }