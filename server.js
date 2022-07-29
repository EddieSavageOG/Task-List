console.log('May the Node be with you');

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://EducatedSavage:rYT9jdbEp5meqbhB@cluster0.nhpo8yc.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
    const db = client.db('my-todos');
    const todoList = db.collection('todos');
    app.listen(3000, function() {
        console.log('listening on 3000');
    })
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    })
    app.post('/todos', (req, res) => {
        todoList.insertOne(req.body)
            .then(result => {
                res.redirect('/');
            })
            .catch(error => console.error(error))        
    })
    app.get('/', (req, res) => {
        db.collection('todos').find().toArray()
        .then(results => {
            res.render('index.ejs', { todos: results })
        })
        .catch(error => console.error(error));
        
    })
})



//TODO left off on the "Using EJS" step on https://zellwk.com/blog/crud-express-mongodb/ where it says "we see lots of [object Objest] because..."