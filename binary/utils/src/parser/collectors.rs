use std::str::Chars;
use std::vec::IntoIter;
use crate::parser::structures::{Pattern, Token, TokenTypes};

pub fn get (patterns: IntoIter<Pattern>, source: & mut Chars) -> Result<Token, String> {
	let mut next_value = source.next();

	let mut token = Token {
		value: String::new(),
		token_type: TokenTypes::GET
	};

	for pattern in patterns {
		match next_value {
			Some(value) => {
				match pattern {
					Pattern::Char(char) => {
						if (char == value) {
							token.value.push_str(value.to_string().as_str());
						} else {
							return Err(String::from("NoteValue"));
						}
					}
					Pattern::Regex(regex) => {
						match regex {
							Ok(regex) => {
								if (regex.is_match(value.to_string().as_str())) {
									token.value.push_str(value.to_string().as_str());
								} else {
									return Err(String::from("NoteValue"));
								}
							},
							Err(regex) => {}
						}
					}
					Pattern::Callback(callback) => {
						if (callback(value)) {
							token.value.push_str(value.to_string().as_str());
						} else {
							return Err(String::from("NoteValue"));
						}
					}
				}
			}
			None => {
				return Err(String::from("NoteValue"));
			}
		}

		next_value = source.next()
	}

	Ok(token)
}