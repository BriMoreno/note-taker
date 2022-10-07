const path = require('path');


//route for notes page
module.exports = function (app) {
    //get to note page
    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'))
    });
    //show home page
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //go homepage
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};
