'use strict';

// Load Environment
require('dotenv').load();

const assert = require('assert');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

function validatePayment(payment) {
  assert(payment.id !== undefined);
  assert(payment.mode === 'test');
  assert(payment.createdDatetime !== undefined);
  assert(payment.status !== undefined);
  assert(payment.expiryPeriod !== undefined);
  assert(payment.amount !== undefined);
  assert(payment.description !== undefined);
  assert(payment.method !== undefined);
  assert(payment.metadata !== undefined);
  assert(payment.details !== undefined);
  assert(payment.profileId !== undefined);
  assert(payment.links.redirectUrl !== undefined);
}

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
    }, (err, payment) => {
      assert(err === null);
      assert(payment.mode === 'test');
      assert(payment.status === 'open');
      assert(payment.metadata.orderId === 'test');
      assert(payment.description === 'My first API payment');
      assert(payment.links.redirectUrl === 'http://localhost');
      done();
    });
  });

  lab.test('should list payments', done => {
    Mollie.payments.list((err, payments) => {
      assert(err === null);
      assert(payments.totalCount > 0);
      assert(payments.offset === 0);
      assert(payments.count > 0);
      assert(Array.isArray(payments.data));
      payments.data.forEach(validatePayment);
      done();
    });
  });
});
