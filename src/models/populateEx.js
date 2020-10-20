const mongoose = require("mongoose");
const Task = require("./taskModel");
const User = require("./userModel");

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const populate = async () => {
	// const task = await Task.findById("5f8ef9573870521ecc2f71ac");
	// // const user = await User.findById(task.user);
	// // console.log(user);
	// await task.populate("user").execPopulate();
	// console.log(task.user);

	const user = await User.findById("5f873034b9e3b30d9cb2349a");
	// const tasks = await Task.find({ user: user._id });

	await user.populate("tasks").execPopulate();
	console.log(user.tasks);
};

populate().then();
