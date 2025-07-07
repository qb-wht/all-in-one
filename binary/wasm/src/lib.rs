mod utils;

use wasm_bindgen::prelude::*;
use web_sys::{window, CanvasRenderingContext2d, HtmlCanvasElement};
use std::cell::RefCell;
use std::vec::Vec;

thread_local! {
    static RECT_STORE: RefCell<Vec<Rectangle>> = RefCell::new(vec![]);
    static CANVAS: RefCell<Option<HtmlCanvasElement>> = RefCell::new(None);
    static CONTEXT: RefCell<Option<CanvasRenderingContext2d>> = RefCell::new(None);
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
  let a = format!("Hello, wasm!");

  alert(&a);
}

#[derive(Debug)]
pub struct Rectangle {
  pub x: f64,
  pub y: f64,
  pub size: f64,
  pub color: String,
}

#[wasm_bindgen]
pub fn init() {
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

  CANVAS.with_borrow_mut(|store| {
    *store = Some(canvas);
  });

  CONTEXT.with_borrow_mut(|store| {
    *store = Some(context);
  });
}

#[wasm_bindgen]
pub fn draw_rectangle(x: f64, y: f64, size: f64, color: &str) -> Result<(), JsValue> {
  let rect = Rectangle {
    x,
    y,
    size,
    color: color.to_string(),
  };

  CONTEXT.with(|ctx| {
    let ctx = ctx.borrow();
    let ctx = ctx.as_ref().expect("Context not initialized");

    ctx.set_fill_style_str(color);
    ctx.fill_rect(x, y, size, size);

    RECT_STORE.with(|store| {
      store.borrow_mut().push(rect);
    });

  });

  Ok(())
}

fn redraw_rectangle(rect: &mut Rectangle) -> Result<(), JsValue> {
  CONTEXT.with(|ctx| {
    let ctx = ctx.borrow();
    let ctx = ctx.as_ref().expect("Context not initialized");

    ctx.set_fill_style_str(rect.color.as_str());
    ctx.fill_rect(rect.x, rect.y, rect.size, rect.size);
  });

  Ok(())
}
#[wasm_bindgen]
pub fn on_mouse_move_rectangle(x: f64, y: f64) -> Result<(), JsValue> {
  RECT_STORE.with(|store| {
    store
      .borrow_mut()
      .iter_mut()
      .for_each(|rect| {
        if x >= rect.x
          && x <= rect.x + rect.size
          && y >= rect.y
          && y <= rect.y + rect.size
        {
          rect.color = String::from("red");
          redraw_rectangle(rect);
        } else {
          rect.color = String::from("green");
          redraw_rectangle(rect);
        }
      });
  });

 Ok(())
}
