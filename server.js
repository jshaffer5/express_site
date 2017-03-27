const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient= require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

var port = process.env.PORT 

if (port==undefined) {port = 3000}
var db
MongoClient.connect('mongodb://admin:Password123@ds143000.mlab.com:43000/mongoloid', (err, database) => {
  if(err) return console.log('Error connecting to Mongo database: \n ', err);

db = database

app.listen(port, function() {  
  console.log('Server is listening on ', port)
})

})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray(function(err, results1) {
    db.collection('listJ').find().toArray( (err, results2) => {
    
    app.set('view engine', 'ejs')
    // renders index.ejs
    res.render('index.ejs', {quotes: results1, listJ: results2}) 	
    console.log('r2 holds: ', results2)
    console.log('r1 holds: ', results1)
    })

  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Database listA Post: \n', req.body)
    res.redirect('/')
  })
})

app.post('/josh_list', (req, res) => {
  db.collection('listJ').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Database listJ Post: \n', req.body)
    res.redirect('/')
  })
})


