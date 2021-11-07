.PHONY: dev-api
dev-api:
	cd backend && npm run dev

.PHONY: dev-ui
dev-ui:
	cd ui && npm run start

.PHONY: dev-populate-data
dev-populate-data:
	cd scripts && ./mongoimport.sh

.PHONY: dev-delete-data
dev-deleve-data:
	cd scripts && ./mongodelete.sh

.PHONY: mongo-start
mongo-start:
	cd scripts && ./mongostart.sh