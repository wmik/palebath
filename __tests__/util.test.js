import test from "ava";
import { util } from "this";

const utilTestSuite = (test, util, context = {}) => {
	test.before("it sets up context", t => {
		t.context = context;
		t.deepEqual(t.context, context);
	});

	test.serial("it checks character case", t => {
		t.true(util.isLowerCase("a"));
		t.false(util.isLowerCase("A"));
		t.true(util.isUpperCase("Z"));
		t.false(util.isUpperCase("z"));
	});

	test.serial("it checks character validity", t => {
		t.true(util.isAlphabet("a"));
		t.false(util.isAlphabet("["));
		t.false(util.isAlphabet("1"));
	});

	test("it checks character index and position validity", t => {
		t.true(util.isValidPosition(1));
		t.true(util.isValidPosition("7"));
		t.true(util.isValidPosition(1));
		t.false(util.isValidIndex(90));
		t.false(util.isValidIndex("string"));
		t.false(util.isValidIndex(-6));
	});

	test.serial("it returns the corresponding character code", t => {
		t.is(util.getCharCode("a"), 97);
		t.is(util.getCharCode("A"), 65);
	});

	test.serial("it normalizes strings", t => {
		t.is(util.normalize(" a "), "a");
	});

	test.serial("fetchers", t => {
		t.is(util.getCharacter(65), "A");
		t.is(util.getCharacter("65"), "A");
		t.is(util.getCharIndex("e"), 4);
		t.is(util.getCharPosition("y"), 25);
		t.is(util.getCategory("i"), "vowel");
		t.is(util.getCategory("k"), "consonant");
		t.is(util.toNumber("1"), 66);
	});

	test.serial("config parser", t => {
		const config = { start: 4, end: 8 };
		t.deepEqual(util.parseConfig(), { _start: 65, _end: 90 });
		t.deepEqual(util.parseConfig(config), { _start: 69, _end: 73 });
	});

	test.serial("edge cases", t => {
		const config = {
			_start: 69,
			_end: 73,
			length: 100
		};
		t.throws(() => util.parseConfig(config));
		t.throws(() => util.parseConfig().start);
		t.throws(() => util.parseConfig().end);
		t.throws(() => util.toNumber("config"));
	});

	test("has", t => {
		t.true(util.has({ a: 1 })("a"));
		t.false(util.has({ a: 1 })("b"));
	});
};

utilTestSuite(test, util);
