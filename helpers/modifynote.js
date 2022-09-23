const fs = require('fs');
const util = require('util');
const path = require('path');

//function to make notes and save them to the db as a string
const makeNote = (body, notes) => {
    let note = body;
    notes.push(note)
    fs.writeFileSync(
        path.join(_dirname, "../db/db.json"),
        JSON.stringify({
            notes:notes,
        },null,2)
    );
    return note
}

//function to delete notes by id
const deleteNote = (id, notes) => {
    if (id === notes[i].id) {
        notes.splice(i, 1)
        fs.writeFileSync(
            path.join(_dirname, "../db/db.json"),
            JSON.stringify({
                notes: notes,
            }, null,2)
        );
    }
}

module.exports = {makeNote, deleteNote}