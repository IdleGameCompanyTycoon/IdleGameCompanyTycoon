const express = require('express');
const app = express()
const PORT = process.env.PORT;
const db = require('./db');

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Get random contract
app.get('/getData', function(request, response, next){
  db.query(`SELECT * FROM ${request.query.table} ORDER BY RANDOM() limit 1`, function(error, results){
    if (error){
      response.status(400).send('Error in database operation');
    } else {
      response.send(results);
    }
  })
})


app.listen(PORT);
