function loadConfig() {
  const targetEnv = (__ENV.ENV || 'dev').toLowerCase();
  const raw = open(`../config/${targetEnv}.json`);
  return JSON.parse(raw);
}

const config = loadConfig();

export function getBaseUrl() {
  return __ENV.BASE_URL || config.BASE_URL;
}

export function getAuthToken() {
  return __ENV.AUTH_TOKEN || config.AUTH_TOKEN || '';
}

export function getRequestTimeout() {
  return __ENV.REQUEST_TIMEOUT || config.REQUEST_TIMEOUT || '30s';
}

export { config };
