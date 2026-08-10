# Casper Deployer - Docker Hub / GHCR publish helpers
# Build context is the repository root (see docker/Dockerfile).

DOCKERFILE ?= docker/Dockerfile
DOCKER_BUILDKIT ?= 1

HUB_IMAGE ?= interchouette/casper-deployer
APP_IMAGE ?= $(HUB_IMAGE)
GHCR_PERSONAL_IMAGE ?= ghcr.io/groussac/casper-deployer
GHCR_WORKER_IMAGE ?= ghcr.io/interchouette/casper-deployer
GHCR_ORG_IMAGE ?= ghcr.io/interchouette-itc/casper-deployer

TAG ?= latest
APP_VERSION ?= 2.2.2
CI ?= 0

.PHONY: help docker-build docker-build-dev docker-push-dev \
	docker-push-dev-hub docker-push-dev-ghcr-personal docker-push-dev-ghcr-itc \
	docker-push-release-hub docker-push-release-ghcr-personal docker-push-release-ghcr-itc \
	docker-push-release docker-hub-description

help:
	@echo "Casper Deployer Docker targets"
	@echo "  make docker-build-dev     Build and tag :dev and :latest"
	@echo "  make docker-push-dev-hub  Push :dev and :latest to Docker Hub"
	@echo "  make docker-push-dev      Local interactive push (Hub + GHCR)"
	@echo "  make docker-build         Build :$(TAG) and :$(APP_VERSION)"
	@echo "  make docker-push-release-hub  Push :$(APP_VERSION) and :latest"
	@echo "Overrides: HUB_IMAGE=$(HUB_IMAGE) APP_VERSION=$(APP_VERSION) TAG=$(TAG)"

docker-build:
	DOCKER_BUILDKIT=$(DOCKER_BUILDKIT) docker build \
		-t $(HUB_IMAGE):$(TAG) \
		-t $(HUB_IMAGE):$(APP_VERSION) \
		-t $(APP_IMAGE):$(TAG) \
		-t $(APP_IMAGE):$(APP_VERSION) \
		-f $(DOCKERFILE) \
		.

docker-build-dev:
	DOCKER_BUILDKIT=$(DOCKER_BUILDKIT) docker build \
		-t casper-deployer:dev \
		-t casper-deployer:latest \
		-t $(HUB_IMAGE):dev \
		-t $(HUB_IMAGE):latest \
		-t $(GHCR_PERSONAL_IMAGE):dev \
		-t $(GHCR_PERSONAL_IMAGE):latest \
		-t $(GHCR_WORKER_IMAGE):dev \
		-t $(GHCR_WORKER_IMAGE):latest \
		-t $(GHCR_ORG_IMAGE):dev \
		-t $(GHCR_ORG_IMAGE):latest \
		-f $(DOCKERFILE) \
		.

docker-push-dev-hub:
	docker push $(HUB_IMAGE):dev
	docker push $(HUB_IMAGE):latest

docker-push-dev-ghcr-personal:
	docker push $(GHCR_PERSONAL_IMAGE):dev
	docker push $(GHCR_PERSONAL_IMAGE):latest

docker-push-dev-ghcr-itc:
	docker push $(GHCR_WORKER_IMAGE):dev
	docker push $(GHCR_WORKER_IMAGE):latest
	docker push $(GHCR_ORG_IMAGE):dev
	docker push $(GHCR_ORG_IMAGE):latest

docker-push-dev:
	@if [ "$(CI)" = "1" ]; then \
		echo "Use docker-push-dev-hub / docker-push-dev-ghcr-personal / docker-push-dev-ghcr-itc in CI"; \
		exit 1; \
	fi
	@echo "Logging in to Docker Hub..."; \
	docker login || { echo "Docker Hub login failed"; exit 1; }
	$(MAKE) docker-push-dev-hub
	@echo "Logging in to GHCR (personal)..."; \
	docker login ghcr.io || { echo "Skipping personal GHCR"; exit 0; }
	$(MAKE) docker-push-dev-ghcr-personal
	@echo "Logging in to GHCR (org)..."; \
	docker login ghcr.io || { echo "Skipping org GHCR"; exit 0; }
	$(MAKE) docker-push-dev-ghcr-itc

docker-push-release-hub:
	docker push $(HUB_IMAGE):$(APP_VERSION)
	docker push $(HUB_IMAGE):latest

docker-push-release-ghcr-personal:
	docker tag $(HUB_IMAGE):$(APP_VERSION) $(GHCR_PERSONAL_IMAGE):$(APP_VERSION)
	docker tag $(HUB_IMAGE):latest $(GHCR_PERSONAL_IMAGE):latest
	docker push $(GHCR_PERSONAL_IMAGE):$(APP_VERSION)
	docker push $(GHCR_PERSONAL_IMAGE):latest

docker-push-release-ghcr-itc:
	docker tag $(HUB_IMAGE):$(APP_VERSION) $(GHCR_WORKER_IMAGE):$(APP_VERSION)
	docker tag $(HUB_IMAGE):latest $(GHCR_WORKER_IMAGE):latest
	docker tag $(HUB_IMAGE):$(APP_VERSION) $(GHCR_ORG_IMAGE):$(APP_VERSION)
	docker tag $(HUB_IMAGE):latest $(GHCR_ORG_IMAGE):latest
	docker push $(GHCR_WORKER_IMAGE):$(APP_VERSION)
	docker push $(GHCR_WORKER_IMAGE):latest
	docker push $(GHCR_ORG_IMAGE):$(APP_VERSION)
	docker push $(GHCR_ORG_IMAGE):latest

docker-push-release: docker-push-release-hub docker-push-release-ghcr-personal docker-push-release-ghcr-itc

## Sync Hub repo Overview from private .cursor/scripts/DOCKERHUB.md
## (docker login, or DOCKER_USERNAME / DOCKER_PASSWORD).
docker-hub-description:
	python3 .cursor/scripts/sync-hub-description.py
