'use strict';

const Request = require('./request');

function create(customerId, data, callback) {
  Request.callRest('POST', `/customers/${customerId}/subscriptions`,
    data, callback);
}

function get(customerId, subscriptionId, callback) {
  Request.callRest('GET',
    `/customers/${customerId}/subscriptions/${subscriptionId}`,
    null, callback);
}

function list(customerId, callback) {
  Request.callRest('GET', `/customers/${customerId}/subscriptions`,
    null, callback);
}

function cancel(customerId, subscriptionId, callback) {
  Request.callRest('GET',
    `/customers/${customerId}/subscriptions/${subscriptionId}`,
    null, callback);
}

module.exports = {
  create,
  get: get,
  list,
  cancel
};
