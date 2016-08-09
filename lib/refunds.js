'use strict';

const Request = require('./request');

function list(callback) {
  Request.callRest('GET', '/refunds', null, callback);
}

module.exports = {
  list
};
