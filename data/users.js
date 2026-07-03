import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
  return [
    {
      id: 1,
      username: 'alice',
      email: 'alice@example.com',
      password: 'alice-pass',
      token: 'alice-token'
    },
    {
      id: 2,
      username: 'bob',
      email: 'bob@example.com',
      password: 'bob-pass',
      token: 'bob-token'
    },
    {
      id: 3,
      username: 'carol',
      email: 'carol@example.com',
      password: 'carol-pass',
      token: 'carol-token'
    }
  ];
});

export function getUserByVu() {
  const index = (__VU - 1) % users.length;
  return users[index];
}

export { users };
