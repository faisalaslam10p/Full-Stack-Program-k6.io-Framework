import { check, sleep } from 'k6';
import { postRequest } from '../helpers/http.helper.js';
import { getUserByVu } from '../data/users.js';

export const options = {
  vus: 5,
  duration: '20s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<700']
  }
};

export default function () {
  const user = getUserByVu();

  const response = postRequest('/posts', {
    username: user.username,
    password: user.password,
    action: 'login'
  });

  check(response, {
    'login response has id': (r) => {
      const body = r.json();
      return body && body.id !== undefined;
    }
  });

  sleep(1);
}
