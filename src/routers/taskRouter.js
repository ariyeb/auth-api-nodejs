const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/taskModel");

const router = new express.Router();

router.post("/tasks/new", auth, async (req, res) => {
	const task = new Task({
		...req.body,
		user: req.user._id,
	});

	try {
		await task.save();
		res.send(task);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get("/tasks/get", auth, async (req, res) => {
	const _id = req.query.id;

	try {
		const task = await Task.findOne({ _id, user: req.user._id });

		if (!task) {
			return res.status(404).send({
				status: 404,
				message: "No task",
			});
		}

		res.send(task);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
