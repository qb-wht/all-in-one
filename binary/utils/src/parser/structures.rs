use regex::Regex;

pub enum Pattern {
	Char(char),
	Callback(Box<dyn Fn(char) -> bool>),
	Regex(Result<Regex, regex::Error>),
}

#[derive(Debug, Clone)]
pub enum TokenTypes {
	// Collectors
	GET,
	// Combinators
	SEQ,
}

#[derive(Debug, Clone)]
pub struct Token {
	pub token_type: TokenTypes,
	pub value: String,
}