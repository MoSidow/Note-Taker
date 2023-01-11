const file = require('../db/file');

const noteRouter = require('express').Router();

noteRouter.get('/notes', (req, res) => {
    file
    .getNotes()
    .then((notes) => {
        return res.json(notes);
    })
   .catch((err) => res.status(500).json(err))
});

noteRouter.post('/notes', (req, res) => {
    file
    .addANote(req.body)
    
.then((note) => res.json(note))
.catch((err) => res.status(500).json(err)) 
});

noteRouter.delete('/notes/:id', (req, res) => {
    file
    .removeANote(req.params.id)
    
.then(() => res.json({ ok: true}))
.catch((err) => res.status(500).json(err)) 
});

