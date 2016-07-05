/**
 * Created by heke on 2016/7/5.
 */
var express = require('express');
var app = express();
var port = 3000;

app.get('/name/:userName', function (req, res) {
    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send('<html><body>' +
        '<h1>Hello ' + req.params.userName + '</h1>' +
        '</body></html>');
})

app.get('*', function (request, response) {
    response.end('Hello World');
})

app.listen(port, function () {
    console.log('The server is running, ' + 'please open your browser at http://localhost:%s', port);
})