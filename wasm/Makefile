prepare:
	rustup target add wasm32-unknown-unknown

CURRENT_DIR = .

WEB_OUT_DIR = pkg

# Pin Binaryen so wasm-pack does not fall back to its vendored 117 download.
BINARYEN_VERSION := 130
BINARYEN_DIR := $(CURDIR)/.tools/binaryen-version_$(BINARYEN_VERSION)
BINARYEN_BIN := $(BINARYEN_DIR)/bin
BINARYEN_PATH_FILE := $(CURDIR)/.tools/wasm-opt-bin

.PHONY: all web clean test pack ensure-binaryen

ensure-binaryen:
	@set -euo pipefail; \
	mkdir -p "$(CURDIR)/.tools"; \
	is_pin() { "$$1" --version 2>/dev/null | grep -qE 'version[_ ]$(BINARYEN_VERSION)([^0-9]|$$)'; }; \
	if command -v wasm-opt >/dev/null 2>&1 && is_pin wasm-opt; then \
		dirname "$$(command -v wasm-opt)" > "$(BINARYEN_PATH_FILE)"; \
		echo "ensure-binaryen: $$(wasm-opt --version) (PATH)"; \
		exit 0; \
	fi; \
	if [ -x "$(BINARYEN_BIN)/wasm-opt" ] && is_pin "$(BINARYEN_BIN)/wasm-opt"; then \
		echo "$(BINARYEN_BIN)" > "$(BINARYEN_PATH_FILE)"; \
		echo "ensure-binaryen: $$($(BINARYEN_BIN)/wasm-opt --version) ($(BINARYEN_BIN))"; \
		exit 0; \
	fi; \
	case "$$(uname -m)" in \
		x86_64|amd64) arch=x86_64 ;; \
		aarch64|arm64) arch=aarch64 ;; \
		*) echo "ensure-binaryen: unsupported arch $$(uname -m)" >&2; exit 1 ;; \
	esac; \
	case "$$(uname -s)" in \
		Linux) plat=linux ;; \
		Darwin) plat=macos ;; \
		*) echo "ensure-binaryen: unsupported OS $$(uname -s)" >&2; exit 1 ;; \
	esac; \
	url="https://github.com/WebAssembly/binaryen/releases/download/version_$(BINARYEN_VERSION)/binaryen-version_$(BINARYEN_VERSION)-$${arch}-$${plat}.tar.gz"; \
	echo "ensure-binaryen: downloading $$url"; \
	rm -rf "$(BINARYEN_DIR)"; \
	curl -fsSL "$$url" | tar -xz -C "$(CURDIR)/.tools"; \
	test -x "$(BINARYEN_BIN)/wasm-opt"; \
	is_pin "$(BINARYEN_BIN)/wasm-opt" || { echo "ensure-binaryen: expected version $(BINARYEN_VERSION)" >&2; exit 1; }; \
	echo "$(BINARYEN_BIN)" > "$(BINARYEN_PATH_FILE)"; \
	echo "ensure-binaryen: $$($(BINARYEN_BIN)/wasm-opt --version)"

pack: web

# getrandom 0.3 on wasm32-unknown-unknown needs the wasm_js backend
web: ensure-binaryen
	PATH="$$(cat "$(BINARYEN_PATH_FILE)"):$$PATH" \
		RUSTFLAGS='--cfg getrandom_backend="wasm_js"' \
		wasm-pack build --target web --release --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR)

clean:
	rm -rf $(WEB_OUT_DIR)
	cargo clean

test:
	cargo test -- --test-threads=1 --nocapture
