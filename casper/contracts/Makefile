prepare:
	rustup target add wasm32-unknown-unknown

build-contract:
	cd contract-test && cargo build --release --target wasm32-unknown-unknown
	wasm-strip contract-test/target/wasm32-unknown-unknown/release/contract-test.wasm 2>/dev/null | true

test: build-contract
	mkdir -p tests/wasm
	cp contract-test/target/wasm32-unknown-unknown/release/contract-test.wasm tests/wasm
	cd tests && cargo test

clippy:
	cd contract-test && cargo clippy --all-targets -- -D warnings
	cd tests && cargo clippy --all-targets -- -D warnings

check-lint: clippy
	cd contract-test && cargo fmt -- --check
	cd tests && cargo fmt -- --check

lint: clippy
	cd contract-test && cargo fmt
	cd tests && cargo fmt

clean:
	cd contract-test && cargo clean
	cd tests && cargo clean
	rm -rf tests/wasm
