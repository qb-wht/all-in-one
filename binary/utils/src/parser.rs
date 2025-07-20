mod collectors;
mod combinators;
mod structures;

use std::cell::RefCell;
use std::rc::Rc;
use regex::Regex;
use collectors::get;
use combinators::seq;
use crate::parser::structures::Pattern;

pub fn parser() {
	let source = "<div> lala".chars();

	let div_pattern = vec![
		Pattern::Char('<'),
		Pattern::Char('d'),
		Pattern::Callback(Box::new(|char| char == 'i')),
		Pattern::Regex(Regex::new(r"\w")),
		Pattern::Char('>'),
	].into_iter();

	let space_pattern = vec![
		Pattern::Char(' '),
	].into_iter();

	let lala_pattern = vec![
		Pattern::Char('l'),
		Pattern::Char('a'),
		Pattern::Char('l'),
		Pattern::Char('a'),
	].into_iter();
	
	let source_ref = Rc::new(RefCell::new(source));

	let div_parser = get(div_pattern)(Rc::clone(&source_ref));
	let space_parser = get(space_pattern)(Rc::clone(&source_ref));
	let lala_parser = get(lala_pattern)(Rc::clone(&source_ref));
	
	for value in div_parser {
		println!("a: {:?}", value.unwrap());
	}

	for value in space_parser {
		println!("a: {:?}", value.unwrap());
	}

	for value in lala_parser {
		println!("a: {:?}", value.unwrap());
	}
	
	seq();
}