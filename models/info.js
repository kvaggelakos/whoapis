/*********************************************************#
# @@ScriptName: info.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-19 15:44:18
# @@Modify Date: 2013-07-19 15:46:24
# @@Function:
#*********************************************************/

/* jshint laxcomma:true */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var infoSchema = new Schema({
  email: String,
  phone: String
});

exports.schema = infoSchema;

module.exports = mongoose.model('Info', infoSchema);
