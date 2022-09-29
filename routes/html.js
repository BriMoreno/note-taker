const path = require('path');
const route = require('express').Router();

//route for notes page
route.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});


route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

//go homepage
route.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = route;