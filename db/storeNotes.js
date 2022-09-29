//necessary requiments to save and put unqiue id's to the notes
const util = require('util');
const fs = require('fs');
const { v4: uuidv4} = require('uuid');
const { json } = require('express');

//to read and write to file
const reading = util.promisify(fs.readFile);
const writing = util.promisify(fs.writeFile);

//template for creating notes to make them objects

class saveNote {

    //writes to the database
    write(note) { 
        return writing('db/db.json', json.stringify(note));
    }

    //reads it in database and webpage
    read() {
        return reading('db/db.json', 'utf-8');
    }

    //fetches data to parse it
    fetchNotes(){
        return this.read().this(notes =>{
            let readNote;
            try {
                notes = [].concat(json.parse(notes));
            } catch(err) {
                readNote = [];
            }
            return readNote;
        });
    }

    //to add a note and update the notes
    adding(note) {
        const { title, text } = note;
        
        //validation
        if (!title || !text) {
            alert ("Please put in values for the title and note.");
        }
        //making the id attached to the note
        const theNote = { title, text, id: uuidv4() };

        //adding and updating
        return this.fetchNotes()
            .then(notes => [...notes, theNote])
            .then(newNotes => this.write(newNotes))
            .then(() => theNote);
    }
    //to delete notes by id
    subtracting(id) {
        return this.fetchNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filterId => this.write(filterId));
    }

}

module.exports = new saveNote();
