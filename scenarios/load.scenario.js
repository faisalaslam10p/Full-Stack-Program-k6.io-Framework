export const loadStages = [
  { duration: '30s', target: 20 },
  { duration: '60s', target: 20 },
  { duration: '20s', target: 0 }
];

export const loadThresholds = {
  http_req_failed: ['rate<0.01'],
  http_req_duration: ['p(95)<800']
};
