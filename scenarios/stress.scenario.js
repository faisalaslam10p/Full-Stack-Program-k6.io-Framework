export const stressStages = [
  { duration: '30s', target: 20 },
  { duration: '30s', target: 50 },
  { duration: '45s', target: 75 },
  { duration: '60s', target: 100 },
  { duration: '30s', target: 0 }
];

export const stressThresholds = {
  http_req_failed: ['rate<0.05'],
  http_req_duration: ['p(95)<1200']
};
