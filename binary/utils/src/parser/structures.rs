use std::cell::RefCell;
use std::rc::Rc;
use std::str::Chars;
use regex::Regex;

pub enum Pattern {
	Char(char),
	Callback(Box<dyn Fn(char) -> bool>),
	Regex(Result<Regex, regex::Error>),
}

#[derive(Debug, Clone)]
pub enum TokenTypes {
	// Collectors
	TAG,
	// Combinators
	SEQ,
}

#[derive(Debug, Clone)]
pub struct Token {
	pub token_type: TokenTypes,
	pub token_name: String,
	pub value: String,
}

#[derive(Debug, Clone)]
pub struct TagOptions {
	pub token_name: String,
}

pub type TokenResult<'a> = Result<Token, String>;
pub type TokenIterator<'a> = Box<dyn Iterator<Item = TokenResult<'a>> + 'a>;
pub type Parser<'a> = Box<dyn FnMut(Rc<RefCell<Chars<'a>>>, TagOptions) -> TokenIterator<'a> + 'a>;