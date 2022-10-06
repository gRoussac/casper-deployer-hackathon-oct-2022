use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(module = "/www/utils/fetch_item.js")]
extern "C" {
    pub async fn fetch_item(item: &str) -> wasm_bindgen::JsValue;
}
