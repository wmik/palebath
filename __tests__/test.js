import test from "ava";
import palebathe from "this";

const palebatheTestSuite = (test, palebathe) => {
	test("it generates an array with all the alphabets", t => {
		const allInfo = palebathe.generateAll();
		t.true(Array.isArray(allInfo));
		t.is(allInfo.length, 26);
	});

	test("it returns the correct character information", t => {
		const infoA = palebathe.getCharInfo("a");
		t.deepEqual(infoA, t.context.constants.A);
	});
};

const setup = test => {
	test.serial("it sets up correctly", t => {
		t.context.constants = {
			A: {
				upperCase: { CODE: 65, string: "A" },
				lowerCase: { CODE: 97, string: "a" },
				position: 1,
				index: 0
			}
		};
		t.true("constants" in t.context);
		t.true("A" in t.context.constants);
	});
	return test;
};

palebatheTestSuite(setup(test), palebathe);
