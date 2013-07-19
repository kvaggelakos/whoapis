/*********************************************************#
# @@ScriptName: config.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:55:58
# @@Modify Date: 2013-07-18 22:23:36
# @@Function:
#*********************************************************/

// Create the object that will contain all configuration
var config = {};

// General api paths
config.api = {};
config.api.version = '/v1';
config.api.basePath = '/api' + config.api.version;

// Paths for specific resources
config.api.whois = config.api.basePath + '/whois';

// Whois server
config.whois = {};
config.whois.server = 'whois.verisign-grs.com';
config.whois.timeout = 5000;

// Database information
config.database = {};
config.database.host = 'localhost';
config.database.collection = 'whoapis';
config.database.connectionString = 'mongodb://' + config.database.host + '/' + config.database.collection;

// Error codes
config.errors = {};
config.errors.paramters = {errorCode: 1, errorMsg: 'You did not specify enough parameters, please check your request'};
config.errors.whois = {errorCode: 2, errorMsg: 'There was an error in contacting the whois server'};
config.errors.apiNotFound =  {errorCode: 3, errorMsg: 'API call was not found'};

module.exports = config;
