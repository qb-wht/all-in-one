mod collectors;
mod combinators;
mod structures;
use collectors::get;
use combinators::seq;
use crate::parser::structures::Pattern;

pub fn parser() {
	get(Pattern::Str("dsd"));
	seq();
}