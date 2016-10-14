var express = require('express');
var http = require('http');
var path = require('path');
var url = require('url');

var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/wired', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end();
});

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(app.get('port'), process.env.HOST, function(){
  console.log("Express server listening on port " + app.get('port'));
});
