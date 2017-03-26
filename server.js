const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient= require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

var db
MongoClient.connect('mongodb://admin:Password123@ds143000.mlab.com:43000/mongoloid', (err, database) => {
  if(err) return console.log('Error connecting to Mongo database: \n ', err);

db = database

app.listen(3000, function() {  
  console.log('Server is listening on 3000')
})

})

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find().toArray(function(err, results) {
  console.log(results)
  
  app.set('view engine', 'ejs')
  // renders index.ejs
    res.render('index.ejs', {quotes: results})
})
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Database Post: \n', req.body)
    res.redirect('/')
  })
})


