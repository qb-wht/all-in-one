use regex::Regex;
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

		let a = tag(patterns);

		console::log_1(&format!("parse {}", code).into());
	}
}
