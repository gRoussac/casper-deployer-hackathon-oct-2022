mod utils;

use crate::utils::js_fetch::fetch_item;
use casper_types::account::AccountHash;
use casper_types::bytesrepr::ToBytes;
use casper_types::Key;
use js_sys::Uint8Array;
use utils::js_log::atob;
use utils::js_log::log;
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

    pub fn account_hash_to_base64_encode(&mut self, _account_hash: &str) -> js_sys::JsString {
        _account_hash.as_base64().into()
    }
}

impl Default for Escrow {
    fn default() -> Self {
        Self::new()
    }
}

pub trait ToBase64 {
    fn as_base64(&self) -> String;
}

impl ToBase64 for &str {
    fn as_base64(&self) -> String {
        let account_hash = AccountHash::from_formatted_str(self).unwrap();
        let key = Key::from(account_hash).to_bytes().unwrap();
        base64::encode(key)
    }
}
