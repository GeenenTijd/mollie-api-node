'use strict';

const Https = require('https');
const Url = require('url');
const Fs = require('fs');
const Path = require('path');

const config = {
  endpoint: 'https://api.mollie.nl',
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
  config.packages = version;
}

function callRest(method, resource, data, callback) {
  const url = `${config.endpoint}/${config.version}${resource}`;
  const parsedUrl = Url.parse(url);
  parsedUrl.method = method;
  parsedUrl.rejectUnauthorized = true;
  parsedUrl.headers = {
    Authorization: `Bearer ${config.key}`,
    Accept: "application/json",
    ['Content-Type']: 'application/json',
    ['User-Agent']: `Mollie/${config.package} Node/${process.version}`
  };

  // Try to read certificate
  Fs.readFile(Path.join(__dirname, './cacert.pem'), (err, data) => {
    if (err) {
      return callback(err);
    }

    parsedUrl.cert = data;
    const request = Https.request(parsedUrl);

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
