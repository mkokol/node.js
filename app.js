/**
 * Module dependencies.
 */

var config = require('./config.js');
GLOBAL.env = config.env;

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , company = require('./routes/company')
  , contact = require('./routes/contact');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/company', company.get);
app.post('/company', company.post);
app.put('/company/:id', company.put);
app.delete('/company/:id', company.delete);

app.get('/contact', contact.get);
app.post('/contact', contact.post);
app.put('/contact/:id', contact.put);
app.delete('/contact/:id', contact.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});