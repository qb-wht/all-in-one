mod collectors;
mod combinators;
mod structures;

use regex::Regex;
use collectors::get;
use combinators::seq;
use crate::parser::structures::Pattern;

pub fn parser() {
	let mut source = "<div> lala".chars();

	let pattern1 = vec![
		Pattern::Char('<'),
		Pattern::Char('d'),
		Pattern::Callback(Box::new(|char| char == 'i')),
		Pattern::Regex(Regex::new(r"\w")),
		Pattern::Char('>'),
	].into_iter();

	let pattern2 = vec![
		Pattern::Char('l'),
		Pattern::Char('a'),
		Pattern::Char('l'),
		Pattern::Char('a'),
	].into_iter();

	let mut a = get(pattern1)(& mut source);

	println!("a: {:?}", a.next().unwrap());
	seq();
}