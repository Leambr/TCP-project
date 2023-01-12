dev:
	docker compose down \
	&& docker compose up -d --build

prod:
	docker compose down \
	&& docker compose -f docker-compose.yml up -d --build