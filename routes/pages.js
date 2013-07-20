/*********************************************************#
# @@ScriptName: pages.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:20:57
# @@Modify Date: 2013-07-20 16:02:56
# @@Function:
#*********************************************************/

/* jshint laxcomma:true */

var config = require('../config')
  , fs = require('fs')
  , marked = require('marked');


module.exports = function(app) {
  // GET requests
  app.get('/*', showPage);
};

function showPage(req, res) {
  var requested = require('url').parse(req.url).pathname;
  switch (requested) {
    case '/':
      // We are gonna parse the index.md to show on index
      var content;
      fs.readFile('README.md', 'ascii', function (err, data) {
        if (err) {
          console.error('There was an error reading index.md: ' + err);
          content = 'There was an error in reading the index file :(';
        } else {
          content = marked(data);
        }

        return res.render('index', {
          title: 'Whoapis', content: content
        });
      });
      break;
    default:
      return res.render('404', {
        title: 'Page not found'
      });
  }
}
