/*********************************************************#
# @@ScriptName: whois.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:29:14
# @@Modify Date: 2013-07-18 12:04:41
# @@Function:
#*********************************************************/

/* jshint laxcomma:true */

var config = require('../../config')
  , responder = require('../../classes/responder')
  , Domain = require('../../models/domain')
  , whois = require('node-whois');

/** 
 * Registers all calls for /whois/*
 * @param  {Express app} app The express application
 */
module.exports = function(app) {
  app.get(config.api.whois + '/query', whoisQuery);
};


/** 
 * whoisQuery will query for a domain using whois
 * @param {Comma separated list} info A comma separated list with the information that you are interested in fetching.
 */
function whoisQuery(req, res) {
  var info = req.query.info.split(',');

}


/**
 * The method that actually performs the whois.
 * @param  {Function} callback The callback for when the whois is done. Parameters are error, data (in that order).
 * @param  {String}   domain   The domain to look up
 */
function whois(callback, domain) {
  whois.lookup(domain, {
    server: {
      host: config.whois.server
    },
    timeout: config.whois.timeout
  }, function(err, data) {
    // Save the results into the database (and implicitly parse for information)
    new Domain({domain: domain, info: data}).save();
    // Callback with the results
    callback(err, data);
  });
}
