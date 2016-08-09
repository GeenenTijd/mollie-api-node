'use strict';

const Request = require('./request');

function list(callback) {
  Request.callRest('GET', '/issuers', null, callback);
}

function get(id, callback) {
  Request.callRest('GET', `/issuers/${id}`, null, callback);
}

module.exports = {
  list,
  get: get
};
