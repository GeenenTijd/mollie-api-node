'use strict';

const Request = require('./lib/request');

// We set our package version to add to request agent
Request.setVersion(require('./package.json').version);

module.exports = {
  setApiEndpoint: Request.setApiEndpoint,
  setApiKey: Request.setApiKey,
  customers: require('./lib/customers'),
  issuers: require('./lib/issuers'),
  mandates: require('./lib/mandates'),
  methods: require('./lib/methods'),
  payments: require('./lib/payments'),
  refunds: require('./lib/refunds'),
  subscriptions: require('./lib/subscriptions')
};
