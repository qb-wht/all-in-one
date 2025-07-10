#[warn(clippy::all, clippy::pedantic)]
mod parser;

use parser::parser;
fn main() {
  parser();
}
