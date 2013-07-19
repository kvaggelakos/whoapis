/*********************************************************#
# @@ScriptName: app.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:44:48
# @@Modify Date: 2013-07-18 13:11:42
# @@Function:
#*********************************************************/

/* jshint laxcomma:true */

var express = require('express')
  , config = require('./config')
  , mongoose = require('mongoose');

var app = module.exports = express.createServer();

// Connect to mongo db
mongoose.connect(config.database.connectionString);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Include api routes
require('./routes/api')(app);

// Include web site
require('./routes/pages')(app);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
