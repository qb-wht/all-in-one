use std::cell::RefCell;
use std::iter::from_fn;
use std::rc::Rc;
use crate::parser::structures::{Parser, TagOptions, Token, TokenTypes};

pub fn seq<'a>(parsers: Vec<Parser<'a>>) -> Parser<'a> {
	let parsers: Vec<_> = parsers.into_iter().map(RefCell::new).collect();
	let parsers = Rc::new(parsers);

	Box::new(move |source, options: TagOptions| {
		let parsers = Rc::clone(&parsers);
		let source = Rc::clone(&source);

		Box::new(from_fn(move || {
			for parser in parsers.iter() {
				println!("Work");

				// Достаём мутабельную ссылку из RefCell
				let mut parser_ref = parser.borrow_mut();
				let mut token_iterator = parser_ref(Rc::clone(&source), options.clone());

				for value in token_iterator {
					println!("a: {:?}", value.unwrap());
				}
			}

			None
		}))
	})
}
