var config = require('./constants/config-constants');

var socket = io.connect(config.baseUrl);

module.exports = socket;