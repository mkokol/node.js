/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , company = require('./routes/company')
  , contact = require('./routes/contact')

  , popup = require('./routes/popup')
  , popupwnd = require('./routes/popupwnd');

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
app.get('/popupwnd', popupwnd.popupwnd);
app.get('/popup', popup.popup);

app.get('/company', company.get);
app.post('/company', company.post);
app.put('/company', company.put);
app.delete('/company', company.delete);

app.get('/contact', contact.get);
app.post('/contact', contact.post);
app.put('/contact', contact.put);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});