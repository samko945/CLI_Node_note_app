console.log("utils.js");

const name = "Jeremy";

const add = function (a, b) {
	return a + b;
};

// whatever you asign to here is what other files get access while asigning using the require keyword
module.exports = add;
