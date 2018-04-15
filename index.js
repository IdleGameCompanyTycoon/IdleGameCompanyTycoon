const express = require('express');
const app = express()
const PORT = process.env.PORT;

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})
app.listen(PORT);
