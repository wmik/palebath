/**
 * @module util
 */
/**
 * Checks if object has key
 * @param {object} object - Object
 * @returns {Function} Predicate function with key as acceptable parameter
 */
function has(object) {
	return key => {
		return Object.prototype.hasOwnProperty.call(object, key);
	};
}

/**
 * Convert a string to uppercase
 * @param {string} char - Character
 * @returns {string} Uppercase equivalent
 */
function uppercase(char) {
	if (typeof char === "string") {
		return char.toUpperCase();
	}
}

/**
 * Convert a string to lowercase
 * @param {string} char - Character
 * @returns {string} Lowercase equivalent
 */
function lowercase(char) {
	if (typeof char === "string") {
		return char.toLowerCase();
	}
}

/**
 * Remove whitespace
 * @param {string} string - String
 * @returns {string} Sanitized string
 */
function normalize(string) {
	if (typeof string === "string") {
		return string.replace(/\s/g, "");
	}
}

/**
 * Return the character code
 * @param {string} char - Character
 * @returns {number} Character code
 */
function getCharCode(char) {
	if (typeof char === "string" && char.length === 1) {
		return char.charCodeAt(0);
	}
}

/**
 * Checks if string or number is a valid uppercase alphabet
 * @param {(string|number)} charOrCode - Character or character code
 * @returns {boolean} Truthy
 */
function isUpperCase(charOrCode) {
	if (typeof charOrCode === "string") {
		charOrCode = getCharCode(charOrCode);
	}
	return charOrCode > 64 && charOrCode < 91;
}

/**
 * Checks if string or number is a valid lowercase alphabet
 * @param {(string|number)} charOrCode - Character or character code
 * @returns {boolean} Truthy
 */
function isLowerCase(charOrCode) {
	if (typeof charOrCode === "string") {
		charOrCode = getCharCode(charOrCode);
	}
	return charOrCode > 96 && charOrCode < 123;
}

/**
 * Checks if string or number is a valid alphabet
 * @param {(string|number)} charOrCode - Character or character code
 * @returns {boolean} Truthy
 */
function isAlphabet(charOrCode) {
	return isUpperCase(charOrCode) || isLowerCase(charOrCode);
}

/**
 * Checks if alphabet index is valid
 * @param {number} index - Index
 * @returns {boolean} Truthy
 */
function isValidIndex(index) {
	if (typeof index === "string") {
		index = parseInt(index, 10);
	}
	if (typeof index === "number") {
		return index >= 0 && index <= 25;
	}
}

/**
 * Checks if alphabet position is valid
 * @param {number} position - Position in alphabet
 * @returns {boolean} Truthy
 */
function isValidPosition(position) {
	if (typeof position === "string") {
		position = parseInt(position, 10);
	}
	if (typeof position === "number") {
		return position >= 1 && position <= 26;
	}
}

/**
 * Get corresponding character from character code
 * @param {number} code - Character code
 * @returns {string} Character
 */
function getCharacter(code) {
	if (typeof code === "string") {
		code = parseInt(code, 10);
	}
	if (typeof code === "number" && !isNaN(code)) {
		return String.fromCharCode(code);
	}
}

/**
 * Return the index of a character
 * @param {string} char - Character
 * @returns {number} Character index in alphabet set
 */
function getCharIndex(char) {
	if (isUpperCase(char)) {
		return getCharCode(char) - 65;
	}
	if (isLowerCase(char)) {
		return getCharCode(char) - 97;
	}
}

/**
 * Return the position of a character in the English alphabet
 * @param {string} char - Character
 * @returns {string} Character position in alphabet set
 */
function getCharPosition(char) {
	return getCharIndex(char) + 1;
}

/**
 * Determines if an alphabet is a vowel or consonant
 * @param {string} char - Alphabet
 * @returns {string} Alphabet type
 */
function getCategory(char) {
	const vowels = ["a", "e", "i", "o", "u"];

	if (isAlphabet(char)) {
		return vowels.includes(lowercase(char)) ? "vowel" : "consonant";
	}
}

/**
 * Parse string or number
 * @param {string|number} value - Value
 * @returns {number} Parsed integer
 */
function toNumber(value) {
	if (typeof value === "string") {
		if (isAlphabet(value)) {
			value = getCharIndex(value);
		} else {
			value = parseInt(value, 10);
		}
	}
	value = typeof value === "number" && !isNaN(value) ? value + 65 : -1;
	if (value >= 0) {
		return value;
	}
	throw new TypeError("Invalid value " + value);
}

/**
 * Parse configuration into usable data
 * @param {object} opts - Configuration ptions
 * @returns {object} Parsed configuration
 */
function parseConfig(opts = {}) {
	const dynamicConfig = {};

	Object.defineProperties(dynamicConfig, {
		length: {
			configurable: true,
			get() {
				return null;
			},
			set(value) {
				this._length = toNumber(value) - 1;
			}
		},
		start: {
			get() {
				throw new ReferenceError("start is inaccessible");
			},
			set(value) {
				this._start = toNumber(value);
			}
		},
		end: {
			get() {
				throw new ReferenceError("end is inaccessible");
			},
			set(value) {
				this._end = toNumber(value);
			}
		}
	});

	const defaults = {
		start: 0,
		end: 25
	};

	const config = Object.assign(dynamicConfig, defaults, opts);

	if (config._length <= config._end) {
		config._end = config._length;
	} else if (config._length > config._end) {
		throw new RangeError(
			`{ length: ${config._length -
				65} } in configuration exceeds the maximum number(${config._end -
				config._start}) of generatable characters`
		);
	}
	delete config._length;
	return config;
}

module.exports = {
	has,
	toNumber,
	normalize,
	uppercase,
	lowercase,
	isAlphabet,
	isLowerCase,
	isUpperCase,
	getCharCode,
	getCategory,
	parseConfig,
	getCharacter,
	getCharIndex,
	isValidIndex,
	getCharPosition,
	isValidPosition
};
