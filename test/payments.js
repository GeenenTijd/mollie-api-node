'use strict';

const assert = require('assert');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.experiment('Payments API', () => {
  const Mollie = require('../index');

  lab.before(done => {
    Mollie.setApiKey('test_b93kfaAsnngIAT3NysojhYvKEJ5YbP');
    done();
  });

  lab.test('should create payment', done => {
    Mollie.Payments.create({
      amount: 10.00,
      description: 'My first API payment',
      redirectUrl: 'http://localhost',
      metadata: {
        orderId: 'test'
      }
    }, function(err, payment) {
      assert(err === null);
      console.log(payment);
      done();
    });
  });
});
