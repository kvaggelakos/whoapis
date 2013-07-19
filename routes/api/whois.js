/*********************************************************#
# @@ScriptName: whois.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:29:14
# @@Modify Date: 2013-07-18 22:05:50
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
  app.get(config.api.whois + '/query/:domain', handleWhoisQuery);
};


/** 
 * whoisQuery will query for a domain using whois
 * @param {Comma separated list} info A comma separated list with the information that you are interested in fetching.
 */
function handleWhoisQuery(req, res) {
  var domain = req.params.domain;
  if (!domain) {
    return responder.error(res, config.errors.paramters);
  }

  // See if the user is interested in any specific information
  if (req.query.info) {
    var info = req.query.info.split(',');
  }

  performWhoisQuery(function(err, data) {
    if (err) {
      console.error(err);
      return responder.error(res, config.errors.whois);
    }
    return responder.send(res, data);
  }, domain);
}

/**
 * The method that actually performs the whois.
 * @param  {Function} callback The callback for when the whois is done. Parameters are error, data (in that order).
 * @param  {String}   domain   The domain to look up
 */
function performWhoisQuery(callback, domain) {
  // First see if we have it cahced in our db
  Domain.findOne({domain: domain}, function (err, domain) {
    if (err) {
      // If there is an error in the db, let's continue and see if we can just query it instead
      console.error('There was an error looking up the domain in the db, continuing to query whois');
      
      whois.lookup(domain, {
        server: {
          host: config.whois.server
        },
        timeout: config.whois.timeout
      }, function(err, data) {

        // Check for errors in the whois
        return callback(err);

        // Save the results into the database (and implicitly parse for information)
        new Domain({domain: domain, result: data}).save(
          function(err, data) {
            if (err) {
              console.error('Error saving the whois result:' + err);
              return callback(err);
            }
            console.log('Saving domain: ' + domain + ' into the db');
            // Callback with the results, with parsed data
            callback(null, data);
          }
        );
      });
    }
    // Return the domain that was found in the db
    console.log('Found entry in db, using it');
    return callback(null, domain);
  });
}
