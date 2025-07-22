use std::cell::RefCell;
use std::vec::IntoIter;
use std::rc::Rc;
use std::iter::from_fn;
use crate::parser::structures::{Parser, Pattern, TagOptions, Token, TokenTypes};

pub fn tag<'a>(
	patterns: IntoIter<Pattern>,
) -> Parser<'a> {
	let patterns = Rc::new(RefCell::new(patterns));

	Box::new(move |source, options: TagOptions| {
		let patterns = Rc::clone(&patterns);
		let source = Rc::clone(&source);

		Box::new(from_fn(move || {
			let mut patterns = patterns.borrow_mut();

			let pattern = patterns.next()?;
			let next_value = source.borrow_mut().next()?;
			
			let token_name = options.token_name.clone();

			let mut token = Token {
				value: String::new(),
				token_type: TokenTypes::TAG,
				token_name,
			};

			match pattern {
				Pattern::Char(c) => {
					if c == next_value {
						token.value.push(next_value);
						Some(Ok(token))
					} else {
						Some(Err("Char Parse Error".into()))
					}
				}
				Pattern::Regex(res) => match res {
					Ok(regex) => {
						if regex.is_match(&next_value.to_string()) {
							token.value.push(next_value);
							Some(Ok(token))
						} else {
							Some(Err("Regex Parse Error".into()))
						}
					}
					Err(_) => Some(Err("Invalid regex".into())),
				},
				Pattern::Callback(callback) => {
					if callback(next_value) {
						token.value.push(next_value);
						Some(Ok(token))
					} else {
						Some(Err("Callback Parse Error".into()))
					}
				}
			}
		}))
	})
}
