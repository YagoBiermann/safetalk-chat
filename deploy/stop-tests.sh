#!/bin/sh

docker-compose -f ../docker/docker-compose.db.base.yml -f ../docker/docker-compose.db.test.yml -f ../docker/docker-compose.test.yml --env-file .docker.test.env -p safetalk_test down