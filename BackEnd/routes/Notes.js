const { Notes } = require('../models/Notes');
const express = require('express');
const router = express.Router();
require('dotenv/config');


// Get all notes 
router.get(`/`, async (req, res) => {

    const NotesList = await Notes.find().sort({ $natural: -1 });

    if (!NotesList) {
        res.status(500).json({ success: false })
    }
    res.send(NotesList);
})


//get by id
router.get(`/note/:id`, async (req, res) => {
    const Note = await Notes.findById(req.params.id);

    if (!Note) {
        return res.status(404).json({ success: false, message: 'Note not found.' });
    }
    res.json({ success: true, data: Note });

})



//add new note 
router.post('/note/', async (req, res) => {

    let newNote = new Notes({
  
     title : req.body.title,
     body : req.body.body,

    })
  
    newNote = await newNote.save();
  
    if (!newNote)
      return res.status(400).send('the new note cannot be add!')
  
    res.send(newNote);
    // console.log(newNote);
  })


//change by id
router.put('/note/:id', async (req, res) => {

    const Note = await Notes.findOneAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            body: req.body.body,
        },
        { new: true }  // to get the updated data
    )

    if (!Note)
        return res.status(400).send('Note cannot be edit!')

    res.send(Note);
   // console.log(Note);
})



//delete the note
router.delete('/note/:id', (req, res) => {

    Notes.findByIdAndRemove(req.params.id).then(note => {
        if (note) {
            return res.status(200).json({ success: true, message: 'note deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "note not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})


module.exports = router;

