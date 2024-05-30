const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
	const notes = loadNotes();

	// const duplicateNotes = notes.filter((note) => note.title === title);
	// more effecient: unlike filter, find will only find one element which is much more suited for this purpose as filter would continue checking all elements in the array
	const duplicateNote = notes.find((note) => note.title === title);

	debugger;

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body,
		});
		saveNotes(notes);
		console.log(chalk.bgGreen("New note added!"));
	} else {
		console.log(chalk.bgRed("Note title taken!"));
	}
};

const removeNote = (title) => {
	const notes = loadNotes();

	// filter out the note for removal
	const updatedNotes = notes.filter((note) => note.title !== title);

	const hasRemoved = notes.length !== updatedNotes.length;

	if (hasRemoved) {
		saveNotes(updatedNotes);
		console.log(chalk.bgGreen("Note removed!"));
	} else {
		console.log(chalk.bgRed("No note found!"));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.bgWhite("Your Notes"));
	notes.forEach((note, i) => {
		const isOdd = (i + 1) % 2 > 0;
		if (isOdd) {
			console.log(chalk.hex("#ccbcbc")(note.title));
		} else {
			console.log(chalk.hex("#4a3f3f")(note.title));
		}
	});
};

const readNote = (title) => {
	const notes = loadNotes();
	const note = notes.find((note) => note.title === title);
	if (note) {
		console.log(chalk.bgWhite(note.title));
		console.log(note.body);
	} else {
		console.log(chalk.bgRed("No note found!"));
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();
		const data = JSON.parse(dataJSON);
		return data;
	} catch (error) {
		return [];
	}
};

module.exports = {
	addNote,
	removeNote,
	listNotes,
	readNote,
};
