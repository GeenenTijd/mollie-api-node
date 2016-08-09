'use strict';

const Request = require('./request');

function create(data, callback) {
  Request.callRest('POST', '/customers', data, callback);
}

function get(id, callback) {
  Request.callRest('GET', `/customers/${id}`, null, callback);
}

function list(callback) {
  Request.callRest('GET', '/customers', null, callback);
}

function createPayment(id, data, callback) {
  Request.callRest('POST', `/customers/${id}/payments`, data, callback);
}

function listPayments(id, callback) {
  Request.callRest('GET', `/customers/${id}/payments`, null, callback);
}

module.exports = {
  create,
  get: get,
  list,
  createPayment,
  listPayments
};
