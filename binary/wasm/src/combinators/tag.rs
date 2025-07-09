use regex::Regex;

pub enum TokenTypes {
	TAG,
}

pub struct Token {
	token_type: TokenTypes,
	value: String,
}

pub enum Pattern {
	Str(String),
	RegExp(Regex),
	Predicate(Box<dyn Fn(&String) -> bool>),
}

type Parser = Box<dyn Fn(Box<dyn Iterator<Item = String>>) -> Box<dyn Iterator<Item = (Token, Box<dyn Iterator<Item = String>>)>>>;

pub fn tag<I>(patterns: I) -> Parser
where
	I: IntoIterator<Item = Pattern>,
{
	let patterns: Vec<Pattern> = patterns.into_iter().collect();

	Box::new(move |mut source| {
		let chunk = source.next();

		let char = match chunk {
			Some(c) => c,
			None => {
				// Возможно ошибки
				return Box::new(std::iter::empty());
			}
		};

		let mut value = String::new();

		for pattern in &patterns {
			match pattern {
				Pattern::Str(str) => {
					if (str != &char) {
						// Возможно ошибки
						return Box::new(std::iter::empty());
					}

					println!("String pattern: {}", str);
				}
				Pattern::RegExp(re) => {
					if (!re.is_match(&char)) {
						// Возможно ошибки
						return Box::new(std::iter::empty());
					}

					println!("Regex pattern: {}", re);
				}
				Pattern::Predicate(predicate) => {
					if (predicate(&char)) {
						// Возможно ошибки
						return Box::new(std::iter::empty());
					}

					println!("Predicate pattern");
				}
			}
		}

		value += &char.to_string();

		let token = Token {
			token_type: TokenTypes::TAG,
			value,
		};

		Box::new(std::iter::once((token, source)))
	})
}
