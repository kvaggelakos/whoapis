/*********************************************************#
# @@ScriptName: pages.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:20:57
# @@Modify Date: 2013-07-18 13:13:20
# @@Function:
#*********************************************************/

var config = require('../config');


module.exports = function(app) {
  // GET requests
  app.get('/*', showPage);
};

function showPage(req, res) {
  var requested = require('url').parse(req.url).pathname;
  switch (requested) {
    case '/':
      return res.render('index', {
        title: 'Whoapis'
      });
    default:
      return res.render('404', {
        title: 'Page not found'
      });
  }
}
