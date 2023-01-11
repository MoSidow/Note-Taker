const noteRouter = require('express').Router();

const path = require('path');

//get url from notes page

noteRouter.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});
// get url from main page
noteRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = noteRouter;

