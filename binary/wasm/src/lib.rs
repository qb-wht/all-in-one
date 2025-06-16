mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    let a = format!("Hello, wasm! {}", greet2());

    alert(&a);
}


pub fn greet2() -> i32 {
    42
}
