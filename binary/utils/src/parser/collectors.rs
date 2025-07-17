use std::cell::RefCell;
use std::str::Chars;
use std::vec::IntoIter;
use std::iter::from_fn;
use crate::parser::structures::{Pattern, Token, TokenTypes};

pub fn get<'a>(
	patterns: IntoIter<Pattern>,
) -> Box<dyn FnMut(&'a mut Chars<'a>) -> Box<dyn Iterator<Item = Result<Token, String>> + 'a> + 'a> {
	let patterns = std::rc::Rc::new(RefCell::new(patterns));

	Box::new(move |source: &'a mut Chars<'a>| {
		let patterns = std::rc::Rc::clone(&patterns);
		
		Box::new(from_fn(move || {
			let mut patterns = patterns.borrow_mut();
			let pattern = match patterns.next() {
				Some(p) => p,
				None => return None,
			};

			let next_value = match source.next() {
				Some(v) => v,
				None => return None,
			};

			let mut token = Token {
				value: String::new(),
				token_type: TokenTypes::GET,
			};

			match pattern {
				Pattern::Char(c) => {
					if c == next_value {
						token.value.push(next_value);
						Some(Ok(token))
					} else {
						Some(Err("NoteValue".into()))
					}
				}
				Pattern::Regex(res) => match res {
					Ok(regex) => {
						if regex.is_match(&next_value.to_string()) {
							token.value.push(next_value);
							Some(Ok(token))
						} else {
							Some(Err("NoteValue".into()))
						}
					}
					Err(_) => Some(Err("Invalid regex".into())),
				},
				Pattern::Callback(callback) => {
					if callback(next_value) {
						token.value.push(next_value);
						Some(Ok(token))
					} else {
						Some(Err("NoteValue".into()))
					}
				}
			}
		}))
	})
}

