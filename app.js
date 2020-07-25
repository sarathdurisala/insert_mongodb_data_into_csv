const actions = require('./actions');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var port = 3000;

app.post('/api/customers', function(req, res) {
    res.send(actions.insert_into_csv(req.body));
});

app.listen(port);