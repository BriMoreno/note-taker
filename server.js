const express = require("express");
const api = require('./routes/notes.js');
const html = require('./routes/html.js');
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/api', api);
app.use('/', html);

app.listen(port, () => {
    console.log('View in http://localhost:3001')
});