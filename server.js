const express = require("express");
const port = process.env.PORT || 3001;
const app = express();

//for data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//routes
require('./routes/html')(app);
require('./routes/notes')(app);

//prints in terminal
app.listen(port, function() {
    console.log('View in http://localhost:3001')
});