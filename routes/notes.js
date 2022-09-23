const route = require('express').Router();
const { notes } = require('../db/db.json');
const {makeNote, deleteNote} = require('../helpers/modifynote');
const {v4:uuidv4} = require('uuid');

//route to get notes
route.get('/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
});

//route for new notes
route.post('/notes', (req, res) => {
    req.body.id = uuid4();
    res.join(makeNote(req.body, notes));
})

//delete note by id
route.delete('/notes/:id', (req, res) => {
    const para = req.params.id;
    deleteNote(para, notes);
    res.redirect("")
})

module.exports = route;