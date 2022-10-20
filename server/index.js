const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path')
const db = require('../database/connection.js')


app.use(express.json());

db.connect((err) => {
  if (!err) {
    console.log('Connected to movie database.');
  }
})



app.use(express.static('client/dist'));


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})



app.get('/movies', (req, res) => {

  var querystring = 'SELECT * FROM movies';
  db.query(querystring, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(results);
    }
  })
})


app.post('/movies', (req, res) => {
  var querystring = `INSERT INTO movies (title, watched) VALUES ("${req.body.title}", false)`;
  console.log('qstring!', querystring);
  db.query(querystring, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('posted successfully!')
      res.status(201).send(results);
    }
  })
})


app.put('/movies', (req, res) => {
var querystring = `UPDATE movies SET watched = NOT watched WHERE id = ${req.body.id}`;
console.log('Put query request:', querystring);
db.query(querystring, (err, results) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.status(204).send(results);
  }
})
})


app.get('/movies/watched', (req, res) => {
  var querystring = 'SELECT * FROM movies';
  db.query(querystring, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      var ret = [ [], [] ];

      for (var i = 0; i < results.length; i++) {
        if (results[i].watched === 0) {
          ret[0].push(results[i])
        } else {
          ret[1].push(results[i])
        }
      }
      //console.log(ret);
      res.status(200).send(ret);
    }
  })
})