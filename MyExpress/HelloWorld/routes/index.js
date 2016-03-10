var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
/*
router.get('/user', function(req, res) {
  res.render('user', { title: 'Express',name:'Heoo' });
});
*/
// 网站首页接受 POST 请求
router.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
router.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
router.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

router.all('/user', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

module.exports = router;
