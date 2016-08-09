'use strict';

// Load Environment
require('dotenv').load();

const assert = require('assert');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.experiment('Payments API', () => {
  const Mollie = require('../index');

  lab.before(done => {
    Mollie.setApiKey(process.env.TEST_KEY);
    done();
  });

  lab.test('should create payment', done => {
    Mollie.payments.create({
      amount: 10.00,
      description: 'My first API payment',
      redirectUrl: 'http://localhost',
      metadata: {
        orderId: 'test'
      }
    }, function(err, payment) {
      assert(err === null);
      assert(payment.mode === 'test');
      assert(payment.status === 'open');
      assert(payment.metadata.orderId === 'test');
      assert(payment.description === 'My first API payment');
      assert(payment.links.redirectUrl === 'http://localhost');
      done();
    });
  });
});
