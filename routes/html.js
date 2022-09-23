const path = require('path');
const route = require('express').Router();

//default route for html page
route.get("/", (req, res) => {
    res.sendFile(path.join(_dirname, "../public/index.html"));
});

//route for notes page
route.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

module.exports = route