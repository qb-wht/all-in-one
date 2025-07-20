use std::cell::RefCell;
use std::str::Chars;
use std::vec::IntoIter;
use std::rc::Rc;
use std::iter::from_fn;
use crate::parser::structures::{Pattern, Token, TokenTypes};

type TokenResult<'a> = Result<Token, String>;
type TokenIterator<'a> = Box<dyn Iterator<Item = TokenResult<'a>> + 'a>;
type Parser<'a> = Box<dyn FnMut(Rc<RefCell<Chars<'a>>>) -> TokenIterator<'a> + 'a>;

pub fn get<'a>(
	patterns: IntoIter<Pattern>,
) -> Parser<'a> {
	let patterns = Rc::new(RefCell::new(patterns));

	Box::new(move |source| {
		let patterns = Rc::clone(&patterns);
		let source = Rc::clone(&source);

		Box::new(from_fn(move || {
			let mut patterns = patterns.borrow_mut();


			let pattern = patterns.next()?;
			let next_value = source.borrow_mut().next()?;

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
