.PHONY: up

up:
	docker-compose -f docker-compose.dev.yml --env-file .docker.dev.env -p safetalk up

.PHONY: down

down:
	docker-compose -f docker-compose.dev.yml --env-file .docker.dev.env -p safetalk down