const path = require('path');


//route for notes page
module.exports = function (app) {
    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'))
    });


    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //go homepage
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};
