import { check, sleep } from 'k6';
import { getRequest } from '../helpers/http.helper.js';
import { getUserByVu } from '../data/users.js';
import { stressStages, stressThresholds } from '../scenarios/stress.scenario.js';

export const options = {
  stages: stressStages,
  thresholds: stressThresholds
};

export default function () {
  const user = getUserByVu();
  const postId = ((user.id + __ITER) % 100) + 1;

  const response = getRequest(`/posts/${postId}`, {
    'X-Search-User': user.username
  });

  check(response, {
    'search response has expected id': (r) => {
      const body = r.json();
      return body && body.id === postId;
    }
  });

  sleep(0.5);
}
