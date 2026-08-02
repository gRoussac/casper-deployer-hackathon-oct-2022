# Casper Deployer — Docker Hub publish helpers
# Build context is the repository root (see docker/Dockerfile).

DOCKERFILE ?= docker/Dockerfile
DOCKER_BUILDKIT ?= 1

HUB_IMAGE ?= interchouette/casper-deployer
HUB_MIRROR_IMAGE ?= gregoshop/casper-deployer
APP_IMAGE ?= $(HUB_IMAGE)

TAG ?= latest
APP_VERSION ?= 2.2.2

.PHONY: help docker-build docker-build-dev docker-push-dev \
	docker-push-dev-hub docker-push-release-hub docker-push-release \
	docker-hub-description

help:
	@echo "Casper Deployer Docker targets"
	@echo "  make docker-build-dev     Build and tag :dev and :latest (Hub + gregoshop mirror)"
	@echo "  make docker-push-dev-hub  Push :dev and :latest to Docker Hub"
	@echo "  make docker-push-dev      Local interactive push (:dev + :latest)"
	@echo "  make docker-build         Build :$(TAG) and :$(APP_VERSION)"
	@echo "  make docker-push-release-hub  Push :$(APP_VERSION) and :latest"
	@echo "Overrides: HUB_IMAGE=$(HUB_IMAGE) HUB_MIRROR_IMAGE=$(HUB_MIRROR_IMAGE) APP_VERSION=$(APP_VERSION) TAG=$(TAG)"

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
		-t $(HUB_MIRROR_IMAGE):dev \
		-t $(HUB_MIRROR_IMAGE):latest \
		-f $(DOCKERFILE) \
		.

docker-push-dev-hub:
	docker push $(HUB_IMAGE):dev
	docker push $(HUB_IMAGE):latest
	docker push $(HUB_MIRROR_IMAGE):dev
	docker push $(HUB_MIRROR_IMAGE):latest

docker-push-dev:
	@if [ "$${CI:-0}" = "1" ]; then \
		echo "Use docker-push-dev-hub in CI"; \
		exit 1; \
	fi
	$(MAKE) docker-push-dev-hub

docker-push-release-hub:
	docker push $(HUB_IMAGE):$(APP_VERSION)
	docker push $(HUB_IMAGE):latest
	docker tag $(HUB_IMAGE):$(APP_VERSION) $(HUB_MIRROR_IMAGE):$(APP_VERSION)
	docker tag $(HUB_IMAGE):latest $(HUB_MIRROR_IMAGE):latest
	docker push $(HUB_MIRROR_IMAGE):$(APP_VERSION)
	docker push $(HUB_MIRROR_IMAGE):latest

docker-push-release: docker-push-release-hub

## Optional: sync Hub repo description (requires DOCKERHUB_TOKEN + DOCKER_USERNAME).
docker-hub-description:
	@if [ -z "$${DOCKERHUB_TOKEN:-}" ] || [ -z "$${DOCKER_USERNAME:-}" ]; then \
		echo "skip docker-hub-description (DOCKERHUB_TOKEN / DOCKER_USERNAME unset)"; \
		exit 0; \
	fi
	@echo "Hub description sync not configured for casper-deployer yet"
