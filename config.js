/*********************************************************#
# @@ScriptName: config.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:55:58
# @@Modify Date: 2013-07-18 10:13:12
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
config.whois.server = 'whois.markmonitor.com';
config.whois.timeout = 5000;

// Database information
config.database = {};
config.database.host = 'localhost';
config.database.collection = 'whoapis';
config.database.connectionString = 'mongodb://' + config.database.host + '/' + config.database.collection;

module.exports = config;
