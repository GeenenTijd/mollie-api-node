'use strict';

const Request = require('./request');

function create(customerId, data, callback) {
  Request.callRest('POST', `/customers/${customerId}/mandates`, data, callback);
}

function get(customerId, mandateId, callback) {
  Request.callRest('GET', `/customers/${customerId}/mandates/${mandateId}`,
    null, callback);
}

function list(customerId, callback) {
  Request.callRest('GET', `/customers/${customerId}/mandates`, null, callback);
}

module.exports = {
  create,
  get: get,
  list
};
