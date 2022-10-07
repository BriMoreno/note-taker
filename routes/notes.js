const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    app.get("/notes", (req, res) => {

        // to read database
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8")); 
        // Sends data to res
        res.json(data);
    });


    app.post("/notes", (req, res) => {

        // makes a new note to display 
        const newNote = req.body;
     

        // Assigns note a unique id 
        newNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
        // Pushes new note into db
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        res.json(data);
    });

    app.delete("/notes/:id", (req, res) => {

        // delete by id
        let noteId = req.params.id.toString();
      
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        const newData = data.filter( note => note.id.toString() !== noteId );
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));

        res.json(newData);
    });
};