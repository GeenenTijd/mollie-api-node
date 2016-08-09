'use strict';

const Request = require('./lib/request');

// We set our package version to add to request agent
Request.setVersion(require('./package.json').version);

module.exports = {
  setApiEndpoint: Request.setApiEndpoint,
  setApiKey: Request.setApiKey,
  Customers: require('./lib/customers'),
  Issuers: require('./lib/issuers'),
  Mandates: require('./lib/mandates'),
  Methods: require('./lib/methods'),
  Payments: require('./lib/payments'),
  Refunds: require('./lib/refunds'),
  Subscriptions: require('./lib/subscriptions')
};
