mod utils;

use crate::utils::js_fetch::fetch_item;
use js_sys::Uint8Array;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Escrow {}

#[wasm_bindgen]
impl Escrow {
    pub fn new() -> Self {
        Escrow {}
    }

    pub fn hello(&mut self) -> String {
        "hello WebA".to_string()
    }

    pub async fn get_wasm(&mut self, _item: &str) -> js_sys::Uint8Array {
        let buffer = fetch_item(_item).await;
        Uint8Array::new(&buffer)
    }
}

impl Default for Escrow {
    fn default() -> Self {
        Self::new()
    }
}
