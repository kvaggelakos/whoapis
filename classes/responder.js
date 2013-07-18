/*********************************************************#
# @@ScriptName: responder.js
# @@Author: Konstantinos Vaggelakos<kozze89@gmail.com>
# @@Create Date: 2013-07-18 08:31:04
# @@Modify Date: 2013-07-18 08:31:11
# @@Function:
#*********************************************************/

exports.send = function(res, json) {
  return res.json(json);
};

exports.sendList = function(res, json, morePages) {
  return res.json({
    morePages: morePages,
    results: json
  });
};

exports.error = function(res, error) {
  res.statusCode = 500;
  return res.json({
    errorCode: error.errorCode,
    errorMsg: error.errorMsg
  });
};

exports.errorWithCode = function(res, code, error) {
  res.statusCode = code;
  return res.json({
    errorCode: error.errorCode,
    errorMsg: error.errorMsg
  });
};


exports.empty = [];
