const route = require('express').Router();
const storeNotes = require('../db/storeNotes');

//route to get notes
route.get('/notes', (req, res) => {
    storeNotes
        .fetchNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
});

//route for new notes
route.post('/notes', (req, res) => {
    storeNotes
        .adding(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err))
});

//delete note by id
route.delete('/notes/:id', (req, res) => {
    storeNotes
        .subtracting(req.params.id)
        .then(() => res.json({ ok: true}))
        .catch(err => res.status(500).json(err))
});

module.exports = route;