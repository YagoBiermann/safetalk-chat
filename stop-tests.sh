#!/bin/sh

docker-compose -f docker-compose.db.base.yml -f docker-compose.db.test.yml -f docker-compose.test.yml --env-file .docker.test.env -p safetalk_test down