var request = require('request')
,   rsvp = require('rsvp')
,   config = require('./constants/config-constants');

/**
 * getPromise promisifies the request module's get functionality
 *
 * @param endpoint String ex. 'topics/111'
 *
 * @return Promise
 */
function getPromise(endpoint) {
  return new rsvp.Promise(function(resolve, reject) {
    var url = config.baseUrl + endpoint;
    request(url, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  });
}

/**
 * postPromise promisifies the request modules' post functionality
 *
 * @param endpoint String ex. 'topics'
 *
 * @return Promise
 */
function postPromise(endpoint, payload) {
  return new rsvp.Promise(function(resolve, reject) {
    var url = config.baseUrl + endpoint;
    request.post(url, {form: payload}, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  });
}

function deletePromise(endpoint) {
  return new rsvp.Promise(function(resolve, reject) {
    var url = config.baseUrl + endpoint;
    request.del(url, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  });
}

module.exports = {
  getPromise: getPromise,
  postPromise: postPromise,
  deletePromise: deletePromise
}