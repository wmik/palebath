const {
	uppercase,
	lowercase,
	isAlphabet,
	getCharCode,
	getCategory,
	parseConfig,
	getCharIndex,
	getCharacter,
	getCharPosition
} = require("./util");

/**
 * Return character information
 * @param {string} char - Character
 * @returns {object} Character information object
 */
function characterInfo(char) {
	if (typeof char === "string" && isAlphabet(char)) {
		const upperCaseString = uppercase(char);
		const lowerCaseString = lowercase(char);
		return {
			uppercase: {
				code: getCharCode(upperCaseString),
				string: upperCaseString
			},
			lowercase: {
				code: getCharCode(lowerCaseString),
				string: lowerCaseString
			},
			index: getCharIndex(char),
			position: getCharPosition(char),
			category: getCategory(char)
		};
	}
}

/**
 * Generates character information
 * @param {object} config - Configuration object
 * @yields {Iterable} Character information iterable
 */
// prettier-ignore
function * generateCharInfo(config) {
	const { _start, _end } = parseConfig(config);
	for (let i = _start; i <= _end; i++) {
		yield characterInfo(getCharacter(i));
	}
}

/**
 * Get character information
 * @param {string} config - Configuration options
 * @param {string} generation - Generation type/format
 * @returns {(Iterator|Promise<array>|array)} Character information
 */
function generate(config, generation = "iterable") {
	const iterator = generateCharInfo(config);
	if (generation !== "iterable") {
		const data = [];
		for (const character of iterator) {
			data.push(character);
		}
		switch (generation) {
			case "promise":
				return Promise.resolve(data);
			default:
				return data;
		}
	}
	return iterator;
}

/**
 * Get character information for all alphabets
 * @param {string} generation - Generation type/format
 * @returns {(Iterator|Promise<array>|array)} Character information
 */
function generateAll(generation = "sync") {
	return generate({ length: 26 }, generation);
}

module.exports = {
	generate,
	generateAll,
	generateCharInfo,
	getCharInfo: characterInfo
};
