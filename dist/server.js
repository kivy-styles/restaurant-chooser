'use strict';

var express = require('express');
var path = require('path');

var app = express();
app.use(express.static('static'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve('../static/'));
});

app.listen(3000, function () {
    return console.log('App started on port 3000');
});