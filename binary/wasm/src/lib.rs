mod utils;
mod canvas;
mod parser;
mod combinators;

use wasm_bindgen::prelude::*;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement};
use crate::canvas::get_canvas;

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
  alert("Hello, wasm!");
}

#[derive(Debug)]
struct Node {
  x: f64,
  y: f64,
  width: f64,
  height: f64,
  color: String,
}

#[wasm_bindgen]
pub struct CanvasService {
  nodes: Vec<Node>,
  canvas: HtmlCanvasElement,
  context: CanvasRenderingContext2d,
}

#[wasm_bindgen]
impl CanvasService {
  #[wasm_bindgen(constructor)]
  pub fn new() -> CanvasService {
    let canvas_struct = get_canvas();
    CanvasService {
      nodes: Vec::new(),
      canvas: canvas_struct.canvas,
      context: canvas_struct.context,
    }
  }

  pub fn draw_grid(&self, step: f64, color: &str) {
    let width = self.canvas.width() as f64;
    let height = self.canvas.height() as f64;

    self.context.begin_path();

    let mut x = 0.0;
    while x <= width {
      self.context.move_to(x, 0.0);
      self.context.line_to(x, height);
      x += step;
    }

    let mut y = 0.0;
    while y <= height {
      self.context.move_to(0.0, y);
      self.context.line_to(width, y);
      y += step;
    }

    self.context.set_stroke_style(&color.clone().into());
    self.context.stroke();
  }

  pub fn add_node(&mut self, x: f64, y: f64, width: f64, height: f64, color: &str) {
    let node = Node {
      x,
      y,
      width,
      height,
      color: color.to_string(),
    };
    self.draw_node(&node);
    self.nodes.push(node);
  }

  fn fill_round_rect(
    &self,
    x: f64,
    y: f64,
    width: f64,
    height: f64,
    radius: f64,
  ) {
    let context = &self.context;

    context.begin_path();

    let r = radius.min(width / 2.0).min(height / 2.0);

    context.move_to(x + r, y);
    context.line_to(x + width - r, y);
    context.quadratic_curve_to(x + width, y, x + width, y + r);
    context.line_to(x + width, y + height - r);
    context.quadratic_curve_to(x + width, y + height, x + width - r, y + height);
    context.line_to(x + r, y + height);
    context.quadratic_curve_to(x, y + height, x, y + height - r);
    context.line_to(x, y + r);
    context.quadratic_curve_to(x, y, x + r, y);

    context.close_path();
    context.fill();
  }

  pub fn on_mouse_move(&mut self, x: f64, y: f64) {
    let context = &self.context;

    for node in &self.nodes {
        if x >= node.x && x <= node.x + node.width && y >= node.y && y <= node.y + node.height {
          self.context.set_fill_style(&"red".into());
          self.fill_round_rect(node.x, node.y, node.width, node.height, 10.0);
        } else {
          self.context.set_fill_style(&node.color.clone().into());
          self.fill_round_rect(node.x, node.y, node.width, node.height, 10.0)
        }
    }
  }

  pub fn on_click(&mut self, x: f64, y: f64) {
    let context = &self.context;

    for node in &self.nodes {
      if x >= node.x && x <= node.x + node.width && y >= node.y && y <= node.y + node.height {
        self.context.set_fill_style(&"blue".into());
        self.fill_round_rect(node.x, node.y, node.width, node.height, 10.0);
      } else {
        self.context.set_fill_style(&node.color.clone().into());
        self.fill_round_rect(node.x, node.y, node.width, node.height, 10.0)
      }
    }
  }

  fn draw_node(&mut self, node: &Node) {
    self.context.set_fill_style(&node.color.clone().into());
    self.fill_round_rect(node.x, node.y, node.width, node.height, 10.0)
  }
}
