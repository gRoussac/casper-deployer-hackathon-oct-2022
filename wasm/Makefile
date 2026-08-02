prepare:
	rustup target add wasm32-unknown-unknown

CURRENT_DIR = .

WEB_OUT_DIR = pkg

.PHONY: all web clean test

pack: web

# getrandom 0.3 on wasm32-unknown-unknown needs the wasm_js backend
web:
	RUSTFLAGS='--cfg getrandom_backend="wasm_js"' wasm-pack build --target web --release --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR)

clean:
	rm -rf $(WEB_OUT_DIR)
	cargo clean

test:
	cargo test -- --test-threads=1 --nocapture
