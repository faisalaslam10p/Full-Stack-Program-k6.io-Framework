#!/usr/bin/env sh
set -eu

ENV_NAME=${1:-dev}

echo "Running login test on ENV=${ENV_NAME}"
k6 run -e ENV="${ENV_NAME}" tests/login.test.js

echo "Running load scenario (posts test) on ENV=${ENV_NAME}"
k6 run -e ENV="${ENV_NAME}" tests/posts.test.js

echo "Running stress scenario (search test) on ENV=${ENV_NAME}"
k6 run -e ENV="${ENV_NAME}" tests/search.test.js
