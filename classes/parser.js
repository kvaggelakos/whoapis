/*********************************************************#
# @@ScriptName: parser.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 12:04:52
# @@Modify Date: 2013-07-18 12:40:00
# @@Function:
#*********************************************************/

var _ = require('underscore');

exports.values = ['email', 'phone'];

exports.parse = function(text) {
  var results = {};

  // Try to extract any emails
  _.extend(results,
    {email: extractEmails(text)}
  );

  // Try to parase out any phone number
  _.extend(results,
    {phone: extractPhone(text)}
  );

};

function extractEmails(text) {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

function extractPhone(text) {
  return text.match(/^((\+)?[1-9]{1,2})?([-\s\.])?(\(\d\)[-\s\.]?)?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}(\s*(ext|x)\s*\.?:?\s*([0-9]+))?$/);
}
