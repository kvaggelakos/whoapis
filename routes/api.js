/*********************************************************#
# @@ScriptName: api.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:27:04
# @@Modify Date: 2013-07-18 22:49:13
# @@Function:
#*********************************************************/

/* jshint laxcomma:true */

var responder = require('../classes/responder')
  , config = require('../config');

module.exports = function(app) {
  // Include the whois api
  require('./api/whois')(app);

  // Default case
  app.get('/api*', apiNotFound);
};

function apiNotFound(req, res) {
  return responder.error(res, config.errors.apiNotFound);
}
