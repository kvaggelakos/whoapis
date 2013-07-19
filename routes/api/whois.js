/*********************************************************#
# @@ScriptName: whois.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:29:14
# @@Modify Date: 2013-07-19 15:54:28
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

  whoisForDomain(function(err, data) {
    if (err) {
      console.error(err);
      return responder.error(res, config.errors.whois);
    }
    return responder.send(res, data);
  }, domain);
}

/**
 * Whois function, will start by checking the db and then performing the query.
 * @param  {Function} callback This will be called with error, result
 * @param  {[type]}   domain   The domain in a string format to look up
 */
function whoisForDomain(callback, domain) {
  // First see if we have it cahced in our db
  Domain.findOne({domain: domain}, function (err, domainResult) {
    if (err || !domainResult) {
      return performWhoisQuery(callback, domain);
    } else {
      // Return the domain that was found in the db
      console.log('Found ' + domain + ' in db, using it');
      console.log(domainResult);
      return callback(null, domainResult);
    }
  });
}

/**
 * The method that actually performs the whois.
 * @param  {Function} callback The callback for when the whois is done. Parameters are error, data (in that order).
 * @param  {String}   domain   The domain to look up
 */
function performWhoisQuery(callback, domainName) {
  // If there is an error in the db, let's continue and see if we can just query it instead
  console.error('Performing WHOIS on: ' + domainName);

  whois.lookup(domainName, {
    server: {
      host: config.whois.server
    },
    timeout: config.whois.timeout
  }, function(err, data) {
    // Check for errors in the whois
    if (err) {
      return callback(err);
    }

    // Save the results into the database (and implicitly parse for information)
    new Domain({domainName: domainName, result: data}).save(
      function(err, domainObject) {
        if (err) {
          console.error('Error saving the whois result:' + err);
          return callback(err);
        }
        console.log('Saving domain: ' + domainName + ' into the db');
        console.log('Domain object: ' + domainObject);
        // Callback with the results, with parsed data
        return callback(null, domainObject);
      }
    );
  });
}
