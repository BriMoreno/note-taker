const path = require("path");

// Routing
module.exports = function (app){
    //to display notes.html
    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    //to display index html
    app.get('/index', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    //to display the index.html for any other thing placed in the url
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};