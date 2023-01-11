const file = require('../db/file');

const noteRouter = require('express').Router();

// GET request to get the notes
noteRouter.get('/notes', (req, res) => {
    file
    .getNotes()
    .then((notes) => {
        return res.json(notes);
    })
   .catch((err) => res.status(500).json(err))
});

//Post request to add a note
noteRouter.post('/notes', (req, res) => {
    file
    .addNote(req.body)

.then((note) => res.json(note))
.catch((err) => res.status(500).json(err)) 
});

// delete request to delete a note
noteRouter.delete('/notes/:id', (req, res) => {
    file
    .removeNote(req.params.id)
    
.then(() => res.json({ ok: true}))
.catch((err) => res.status(500).json(err)) 
});

module.exports = noteRouter

