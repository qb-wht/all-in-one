use regex::Regex;
use wasm_bindgen::JsValue;
use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console;

use crate::combinators::tag::{Pattern, tag};

#[wasm_bindgen]
pub struct ParseService {
}

#[wasm_bindgen]
impl ParseService {
	#[wasm_bindgen(constructor)]
	pub fn new() -> ParseService {
		ParseService {}
	}

	pub fn parse(&self, code: &str) {
		let source_data = vec!["a".to_string(), "b".to_string(), "c".to_string()];
		let source_iter = Box::new(source_data.into_iter());

		let patterns = vec![
			Pattern::Str("a".to_string()),
			Pattern::Predicate(Box::new(|c| c == "b")),
		];

		let source_iter = "alala"
			.chars()
			.map(|c| c.to_string())
			.collect::<Vec<String>>()
			.into_iter();

		let boxed_iter = Box::new(source_iter);


		let a = tag(patterns)(boxed_iter);


		for res in a {
			console::log_1(&JsValue::from_str(&format!("parse {:?}", res.0)));
		}

		// console::log_1(&format!("parse {}", code).into());
	}
}
