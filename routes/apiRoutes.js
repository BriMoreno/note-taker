const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    app.get("/api/notes", (req, res) => {
        let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(noteList);
    });


    // get the notes to display with the new note that was made
    app.post("/api/notes", (req, res) => {
 
        const newNote = req.body;

        // make a unique Id
        newNote.id = uuidv4();
        let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        noteList.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
        res.json(noteList);
    });


    // delete by id if that id exists
    app.delete("/api/notes/:id", (req, res) => {

        let noteId = req.params.id.toString();
        let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        const newList = noteList.filter( note => note.id.toString() !== noteId );

        fs.writeFileSync('./db/db.json', JSON.stringify(newList));
        res.json(newList);
    });
};