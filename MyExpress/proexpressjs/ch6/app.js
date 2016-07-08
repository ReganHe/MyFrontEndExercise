var express = require('express');
var path = require('path');

var app = express();
var port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

var users = {
    'azat': {
        email: 'hi@azat.co',
        website: 'http://azat.co',
        blog: 'http://webapplog.com'
    }
};

var findUserByUsername = function (username, callback) {
    if (!users[username]) {
        return callback(new Error('No user matching ' + username));
    }

    return callback(null, users[username]);
}

app.get('/v1/users/:username', function (request, response, next) {
    var username = request.params.username;
    findUserByUsername(username, function (error, user) {
        if (error) return next(error);
        return response.render('user', user);
    });
});

app.get('/v1/admin/:username', function (request, response, next) {
    var username = request.params.username;
    findUserByUsername(username, function (error, user) {
        if (error)return next(error);
        return response.render('admin', user);
    });
});

var findUserByUsernameMiddleware = function (request, response, next) {
    if (request.params.username) {
        console.log('Username param was detected: ' + request.params.username);
        findUserByUsername(request.params.username, function (error, user) {
            if (error)return next(error);
            request.user = user;
            return next();
        })
    } else {
        return next();
    }
}

app.get('/v2/users/:username',
    findUserByUsernameMiddleware,
    function (request, response, next) {
        return response.render('user', request.user);
    });

app.get('/v2/admin/:username',
    findUserByUsernameMiddleware,
    function (request, response, next) {
        return response.render('admin', request.user);
    });

app.param('v3Username',function(request,response,next,username){
    console.log('Username param was detected: '+username);
    findUserByUsername(username,function(error,user){
        if (error)return next(error);
        request.user = user;
        return next();
    });
});

app.get('/v3/users/:v3Username',
    function (request, response, next) {
        return response.render('user', request.user);
    });

app.get('/v3/admin/:v3Username',
    function (request, response, next) {
        return response.render('admin', request.user);
    });


app.get('*', function (request, response) {
    response.end('Hello World');
})

app.listen(port, function () {
    console.log('The server is running, ' + 'please open your browser at http://localhost:%s', port);
})
