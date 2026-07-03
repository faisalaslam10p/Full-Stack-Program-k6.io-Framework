import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl, getAuthToken, getRequestTimeout } from './env.helper.js';

function defaultParams(customHeaders = {}) {
  const token = getAuthToken();

  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders
    },
    timeout: getRequestTimeout()
  };
}

export function getRequest(path, customHeaders = {}) {
  const response = http.get(`${getBaseUrl()}${path}`, defaultParams(customHeaders));

  check(response, {
    'GET status is 2xx': (r) => r.status >= 200 && r.status < 300
  });

  return response;
}

export function postRequest(path, payload, customHeaders = {}) {
  const response = http.post(
    `${getBaseUrl()}${path}`,
    JSON.stringify(payload),
    defaultParams(customHeaders)
  );

  check(response, {
    'POST status is 2xx/201': (r) => (r.status >= 200 && r.status < 300) || r.status === 201
  });

  return response;
}
