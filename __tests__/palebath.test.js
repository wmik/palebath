import test from "ava";
import palebath from "this";

const palebathTestSuite = (test, palebath, context = {}) => {
	test.before("it sets up context", t => {
		t.context = context;
		t.deepEqual(t.context, context);
	});

	test.serial("it generates an array with all the alphabets", t => {
		const allInfo = palebath.generateAll();
		t.true(Array.isArray(allInfo));
		t.is(allInfo.length, 26);
		t.is(allInfo[0].position, 1);
		t.is(allInfo[allInfo.length - 1].position, 26);
	});

	test.serial(
		"it generates a promise with an array of all alphabets",
		async t => {
			const allInfo = await palebath.generateAll("promise");
			t.true(Array.isArray(allInfo));
			t.is(allInfo.length, 26);
			t.is(allInfo[0].position, 1);
			t.is(allInfo[allInfo.length - 1].position, 26);
		}
	);

	test.serial("it returns the correct character information", t => {
		const infoA = palebath.getCharInfo("a");
		t.deepEqual(infoA, t.context.constants.A);
	});

	test.serial(
		"it returns an iterator to generate a specified range of character information",
		t => {
			const eTohIterator = palebath.generateCharInfo({ start: "e", end: "h" });
			t.is(eTohIterator.next().value.position, 5);
			t.is(eTohIterator.next().value.lowercase.string, "f");
			t.is(eTohIterator.next().value.index, 6);
			t.is(eTohIterator.next().value.uppercase.string, "H");
			t.deepEqual(eTohIterator.next(), { value: undefined, done: true });
		}
	);

	test.serial("it generates a specified range of character information", t => {
		const eToh = palebath.generate({ start: "e", end: "h" }, "sync");
		t.is(eToh.length, 4);
		t.is(eToh[0].position, 5);
		t.is(eToh[1].lowercase.string, "f");
		t.is(eToh[eToh.length - 1].index, 7);
	});

	test.serial("imports default correctly", t => {
		const palebathDefault = require("this").default;
		t.deepEqual(palebath.getCharInfo(), palebathDefault.getCharInfo());
	});
};

const context = {
	constants: {
		A: {
			uppercase: { code: 65, string: "A" },
			lowercase: { code: 97, string: "a" },
			position: 1,
			index: 0,
			category: "vowel"
		}
	}
};

palebathTestSuite(test, palebath, context);
