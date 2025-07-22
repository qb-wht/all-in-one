mod collectors;
mod combinators;
mod structures;

use std::cell::RefCell;
use std::rc::Rc;
use regex::Regex;
use collectors::tag;
use combinators::seq;
use crate::parser::structures::{Pattern, TagOptions};

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

	// let mut div_parser = tag(div_pattern)(Rc::clone(&source_ref), TagOptions {
	// 	token_name: String::from("div_token")
	// });
	// 
	// let mut space_parser = tag(space_pattern)(Rc::clone(&source_ref), TagOptions {
	// 	token_name: String::from("space_token")
	// });
	// 
	// let mut lala_parser = tag(lala_pattern)(Rc::clone(&source_ref), TagOptions {
	// 	token_name: String::from("lala_token")
	// });
	
	// while true {
	// 	let value = div_parser.next();
	// 	
	// 	match value { 
	// 		Some(value) => {
	// 			match value { 
	// 				Ok(value) => {
	// 					println!("a: {:?}", value);
	// 				},
	// 				Err(error) => break,
	// 			}
	// 		},
	// 		None => break,
	// 	}
	// }
	
	// for value in div_parser {
	// 	println!("a: {:?}", value.unwrap());
	// }

	// for value in space_parser {
	// 	println!("b: {:?}", value.unwrap());
	// }
	// 
	// for value in lala_parser {
	// 	println!("c: {:?}", value.unwrap());
	// }
	
	let str_parser = vec![
		tag(div_pattern),
		tag(space_pattern),
		tag(lala_pattern),
	];
	
	let a = seq(str_parser)(Rc::clone(&source_ref), TagOptions {
		token_name: String::from("lala_token")
	});

	for value in a {
		println!("c: {:?}", value.unwrap());
	}
}