const bcrypt = require("bcryptjs");

const password = "mypassword123";

const hashPaswword = async (password) => {
	const hashPass = await bcrypt.hash(password, 8);
	// console.log(hashPass);

	const isMatch = await bcrypt.compare(password, hashPass);
	console.log(isMatch);
};

hashPaswword(password).then();
