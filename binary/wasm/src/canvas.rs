use wasm_bindgen::prelude::*;
use web_sys::{window, CanvasRenderingContext2d, HtmlCanvasElement};

pub struct Canvas {
	pub canvas: HtmlCanvasElement,
	pub context: CanvasRenderingContext2d,
}

pub fn get_canvas () -> Canvas {
	let window = window().expect("No global `window` exists");
	let document = window.document().expect("Should have a document on window");

	let canvas = document
		.get_element_by_id("canvas")
		.expect("Should have a canvas")
		.dyn_into::<HtmlCanvasElement>()
		.expect("Should be a canvas");

	let context = canvas
		.get_context("2d")
		.expect("Should have.ctx")
		.expect("Should have.ctx")
		.dyn_into::<CanvasRenderingContext2d>()
		.expect("Should be a canvas");

	Canvas { canvas, context }
}
