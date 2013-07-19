/*********************************************************#
# @@ScriptName: domain.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 09:44:21
# @@Modify Date: 2013-07-19 15:53:44
# @@Function: Domain model for storing whois
#*********************************************************/

/* jshint laxcomma:true */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , parser = require('../classes/parser')
  , Info = require('./info');

var domainSchema = new Schema({
  domainName: String, // The domain name
  searched: {type: Date, default: Date.now}, // The date that the whois was made
  result: String, // The result from the whois
  info: [Info.schema] // the parsed info
});

/**
 * Overriding the save method in order to parse out interesting information before saving
 */

domainSchema.pre('save', function (next) {
  this.info = new Info(parseData(this.result));
  next();
});

/** 
 * This function will try to parse out any intesresting information
 * @return {Info model} Returns Info model with parsed (if successful) information
 */
function parseData(text) {
  return parser.parse(text);
}

exports.schema = domainSchema;

module.exports = mongoose.model('Domain', domainSchema);
