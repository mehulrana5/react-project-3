const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

//route 1 fetch all notes 
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500);
    }
})
//route 2 post a note
router.post('/addnote', fetchuser,
    [
        body('title', 'title should be atleast 3 char long').isLength({ min: 3 }),
        body('description', 'description should be atleast 5 char long').isLength({ min: 5 })
    ],
    async (req, res) => {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const SavedNote = await note.save();
            res.json(SavedNote)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("some error occurred in add notes route");
        }
    })
router.put('/updatenote/:id', fetchuser,
    [
        body('title', 'title should be atleast 3 char long').isLength({ min: 3 }),
        body('description', 'description should be atleast 5 char long').isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag } = req.body
            var newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }
            let note = await Note.findById(req.params.id)
            if (!note) { return res.status(404).send("not found") }
            if (note.user.toString() !== req.user.id) { return res.status(401).send("not allowed to update others notes") }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("some error occurred in update notes route");
        }
    })


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("user not found") }
    if (note.user.toString() !== req.user.id) { return res.status(401).send("not allowed to delete others notes") }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "sucess": "deleted the note", note: note });
})
module.exports = router 