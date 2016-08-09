'use strict';

const Request = require('./request');

function list(callback) {
  Request.callRest('GET', '/methods', null, callback);
}

function get(id, callback) {
  Request.callRest('GET', `/methods/${id}`, null, callback);
}

module.exports = {
  list,
  get: get
};
