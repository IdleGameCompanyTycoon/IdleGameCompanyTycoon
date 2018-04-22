const express = require('express');
const app = express()
const PORT = process.env.PORT;
const db = require('./db');

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.get('/getData', function(request, response){
  db.query('SELECT * FROM contracts', function(error, results){
    if (error){
      response.status(400).send('Error in database operation');
    } else {
      response.send('nice');
    }
  })
})


app.listen(PORT);
