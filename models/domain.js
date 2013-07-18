/*********************************************************#
# @@ScriptName: domain.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 09:44:21
# @@Modify Date: 2013-07-18 12:02:20
# @@Function: Domain model for storing whois
#*********************************************************/

/* jshint laxcomma:true */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore');

var domainSchema = new Schema({
  domain: String, // The domain name
  searched: {type: Date, default: Date.now}, // The date that the whois was made
  result: String, // The result from the whois
  info: {type: String, default: {}} // The parsed info
});


/**
 * Overriding the save method in order to parse out interesting information before saving
 */
domainSchema.methods.save = function(callback) {
  this.info = _.extend(this.info, parseData());
  this.__super__(callback);
};


/** 
 * This function will try to parse out any intesresting information
 * @return {JSON data} Returns json array with interesting information
 */
function parseData() {

}


module.exports = mongoose.model('Domain', domainSchema);
