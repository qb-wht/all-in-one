pub enum Pattern {
	Char(char),
	// Callback,
	// 	// Regexp
}

#[derive(Debug)]
pub enum TokenTypes {
	// Collectors
	GET,
	// Combinators
	SEQ,
}

#[derive(Debug)]
pub struct Token {
	pub token_type: TokenTypes,
	pub value: String,
}