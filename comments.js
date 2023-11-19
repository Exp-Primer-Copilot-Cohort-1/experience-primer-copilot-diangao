//Create web server
const express = require('express');
const app = express();

//Create connection to database
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'comments'
});

//Connect to database
connection.connect();

//Create a route
app.get('/', function(req, res) {
    res.send('Hello World');
});

//Get all comments
app.get('/comments', function(req, res) {
    //Query to get all comments
    connection.query('SELECT * FROM comments', function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

//Get a comment by id
app.get('/comments/:id', function(req, res) {
    //Query to get comment by id
    connection.query('SELECT * FROM comments WHERE id = ?', [req.params.id], function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

//Create a comment
app.post('/comments', function(req, res) {
    //Query to create a comment
    connection.query('INSERT INTO comments (name, content) VALUES (?, ?)', [req.body.name, req.body.content], function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

//Update a comment
app.put('/comments/:id', function(req, res) {
    //Query to update a comment
    connection.query('UPDATE comments SET name = ?, content = ? WHERE id = ?', [req.body.name, req.body.content, req.params.id], function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

//Delete a comment
app.delete('/comments/:id', function(req, res) {
    //Query to delete a comment
    connection.query('DELETE FROM comments WHERE id = ?', [req.params.id], function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

//Listen on port 3000
app.listen(3000, function() {
    console.log('Server running at port 3000');
});