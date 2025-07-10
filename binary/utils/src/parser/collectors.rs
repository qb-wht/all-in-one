use crate::parser::structures::{Pattern, Token, TokenTypes};

pub fn get (pattern: Pattern) -> Result<Token, String> {
	println!("GET");

	let token = Token {
		value: "token_value".to_string(),
		token_type: TokenTypes::GET
	};

	Ok(token)
}