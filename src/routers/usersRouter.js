const express = require("express");
const User = require("../models/userModel");

const router = new express.Router();

router.post("/users/new", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.send(user);
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: err.message,
		});
	}
});

router.get("/users/get", async (req, res) => {
	const _id = req.query.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send({
				status: 404,
				message: "wrong id",
			});
		}

		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/users/get-all", async (req, res) => {
	try {
		const users = await User.find({});
		if (users.length === 0) {
			return res.status(404).send({
				status: 404,
				message: "no users",
			});
		}
		res.send(users);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.patch("/users/edit", async (req, res) => {
	const allowdUpdates = ["name", "age", "email", "password"];
	for (let update in req.body) {
		if (!allowdUpdates.includes(update)) {
			return res.status(400).send({
				status: 400,
				message: "Invalid update: " + update,
			});
		}
	}

	const _id = req.query.id;

	try {
		// const user = await User.findByIdAndUpdate(_id, req.body, {
		// 	new: true, // return new document
		// 	runValidators: true, // להריץ ולידטורים של הסכימה
		// });
		const user = await User.findById(_id);

		if (!user) {
			return res.status(404).send({
				status: 404,
				message: "wrong id",
			});
		}
		for (let update in req.body) {
			user[update] = req.body[update];
		}
		await user.save();

		res.send(user);
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: err.message,
		});
	}
});

router.delete("/users/delete", async (req, res) => {
	const _id = req.query.id;
	try {
		const user = await User.findByIdAndDelete(_id);

		if (!user) {
			return res.status(404).send({
				status: 404,
				message: "wrong id",
			});
		}

		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/users/search", async (req, res) => {
	const allowedSearch = ["name", "age", "email", "password"];
	for (let search in req.body) {
		if (!allowedSearch.includes(search)) {
			return res.status(400).send({
				status: 400,
				message: "Invalid search: " + search,
			});
		}
	}

	try {
		const users = await User.find(req.body);

		res.send(users);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/users/login", async (req, res) => {
	
});

// צרו בגשת גט של חיפוש - הבקשה מקבלת בתוך גוף הבקשה את שדות החיפוש ומחזירה דוקמנטים שמתאימים לשדות
// יש לוודא שהשדות מתאימים למודל.

module.exports = router;

// צרו פרויקט חדש של שרת אתר קניות של מחשבים ניידים
// לכל מחשב יש: יצרן, מעבד, זכרון פנימי, גודל מסך, מחיר
// תעשו ולדיציה למה שנדרש בסכימה
// צרו ראוטים של
// יצירת דוקמנט למחשב חדש
// קבלת מחשב על פי איידי
// מחיקת מחשב
// עריכת פרטי מחשב
// חיפוש מחשב על פי שדות חיפוש כאשר במחיר יהיה אפשר לציין טווח מחירים
