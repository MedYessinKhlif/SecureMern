require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const signUpRoutes = require("./routes/signUp");
const signInRoutes = require("./routes/signIn");
const passwordResetRoutes = require("./routes/passwordReset");

connection();

app.use(express.json());
app.use(cors());

app.use("/api/sign-up", signUpRoutes);
app.use("/api/sign-in", signInRoutes);
app.use("/api/password-reset", passwordResetRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}.`));
