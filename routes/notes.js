const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    app.get("/notes", (req, res) => {

        // to read database
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        console.log("\nGET req - Returning notes data: " + JSON.stringify(data));
        
        // Sends data to res
        res.json(data);
    });


    app.post("/notes", (req, res) => {

        // makes a new note to display 
        const newNote = req.body;
        console.log("\n\nPOST req - New Note : " + JSON.stringify(newNote));

        // Assigns note a unique id 
        newNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
        // Pushes new note into db
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        console.log("\nSuccessfully added new note to 'db.json' file!");
        res.json(data);
    });

    app.delete("/notes/:id", (req, res) => {

        // delete by id
        let noteId = req.params.id.toString();
        console.log(`\n\nDELETE note req for noteId: ${noteId}`);
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        const newData = data.filter( note => note.id.toString() !== noteId );
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        console.log(`\nSuccessfully deleted note with id : ${noteId}`);

        res.json(newData);
    });
};