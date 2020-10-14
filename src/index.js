const express = require("express");
const cors = require("cors");

const port = process.env.PORT;
require("./db/mongoose");
const usersRouter = require("./routers/usersRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use(usersRouter);

app.listen(port, () => {
	console.log("Server connectes, port: ", port);
});
