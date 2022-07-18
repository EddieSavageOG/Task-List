console.log('May the Node be with you');

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://EducatedSavage:rYT9jdbEp5meqbhB@cluster0.nhpo8yc.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
})

app.listen(3000, function() {
    console.log('listening on 3000');
})
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.post('/todos', (req, res) => {
    console.log(req.body);
})

//TODO left off on the "Changing the Database" step on https://zellwk.com/blog/crud-express-mongodb/ after connecting to the MongoDatabase