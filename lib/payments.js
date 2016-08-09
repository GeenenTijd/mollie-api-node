'use strict';

const Request = require('./request');

function create(data, callback) {
  Request.callRest('POST', '/payments', data, callback);
}

function get(id, callback) {
  Request.callRest('GET', `/payments/${id}`, null, callback);
}

function list(callback) {
  Request.callRest('GET', '/payments', null, callback);
}

function createRefund(id, data, callback) {
  Request.callRest('POST', `/payments/${id}/refunds`, data, callback);
}

function getRefund(paymentId, refundId, callback) {
  Request.callRest('GET', `/payments/${paymentId}/refunds/${refundId}`,
    null, callback);
}

function cancelRefund(paymentId, refundId, callback) {
  Request.callRest('DELETE', `/payments/${paymentId}/refunds/${refundId}`,
    null, callback);
}

function listRefunds(paymentId, callback) {
  Request.callRest('GET', `/payments/${paymentId}/refunds`, null, callback);
}

module.exports = {
  create,
  get: get,
  list,
  createRefund,
  getRefund,
  cancelRefund,
  listRefunds
};
