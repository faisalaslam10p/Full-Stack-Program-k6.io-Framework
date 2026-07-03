import { check, sleep } from 'k6';
import { getRequest, postRequest } from '../helpers/http.helper.js';
import { getUserByVu } from '../data/users.js';
import { loadStages, loadThresholds } from '../scenarios/load.scenario.js';

export const options = {
  stages: loadStages,
  thresholds: loadThresholds
};

export default function () {
  const user = getUserByVu();

  const readResponse = getRequest('/posts/1', {
    'X-User': user.username
  });

  check(readResponse, {
    'read post title exists': (r) => {
      const body = r.json();
      return body && typeof body.title === 'string';
    }
  });

  const createResponse = postRequest('/posts', {
    title: `post by ${user.username}`,
    body: 'k6 load scenario payload',
    userId: user.id
  });

  check(createResponse, {
    'create post status 201': (r) => r.status === 201
  });

  sleep(1);
}
