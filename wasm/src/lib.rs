mod utils;

use crate::utils::js_fetch::fetch_item;
use utils::js_log::atob;
use utils::js_log::log;

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
        let greetings = "Hello Web Assembly! My Name is Greg, I am glad you are looking under the hood, found any bug ? having an error log ? please kindly contact me on gtihub at https://github.com/gRoussac/casper-deployer-hackathon-oct-2022 or per email at ".to_string();
        log(greetings);
        log(atob("Z3JlZ29yeUBjYXNwZXJsYWJzLmlv".to_string())
            .as_string()
            .unwrap());
        "Greetings in return!".to_string()
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
