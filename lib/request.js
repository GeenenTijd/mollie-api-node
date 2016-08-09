'use strict';

const Https = require('https');
const Fs = require('fs');
const Path = require('path');

const config = {
  endpoint: 'api.mollie.nl',
  version: 'v1',
  key: ''
};

function setApiEndpoint(endpoint) {
  config.endpoint = endpoint;
}

function setApiKey(key) {
  config.key = key;
}

function setVersion(version) {
  config.package = version;
}

function callRest(method, resource, data, callback) {
  // Try to read certificate
  Fs.readFile(Path.join(__dirname, '/cacert.pem'), (err, cert) => {
    if (err) {
      return callback(err);
    }

    const requestOptions = {
      host: config.endpoint,
      path: `/${config.version}${resource}`,
      method,
      rejectUnauthorized: true,
      cert,
      headers: {
        Authorization: `Bearer ${config.key}`,
        Accept: 'application/json',
        ['Content-Type']: 'application/json',
        ['User-Agent']: `Mollie/${config.package} Node/${process.version}`
      }
    };
    const request = Https.request(requestOptions);

    request.on('error', e => {
      return callback(e);
    });

    request.on('response', response => {
      let body = '';
      response.on('data', function(data) {
        body += data.toString();
      });
      response.on('end', function() {
        let result;
        // We handle json parsing errors
        try {
          result = JSON.parse(body);
        } catch (ex) {
          return callback(ex);
        }
        return callback(null, result);
      });
    });

    // Add payload to request
    if (data) {
      request.write(JSON.stringify(data));
    }
    return request.end();
  });
}

module.exports = {
  setApiEndpoint,
  setApiKey,
  setVersion,
  callRest
};
