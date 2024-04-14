const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// Sending the password reset link to the user.
router.post("/", async (req, res) => {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "User with the provided email does not exist." });

		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),

			}).save();
		}

		const url = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}/`;
		await sendEmail(user.email, "Please reset your password.", url);

		res
			.status(200)
			.send({ message: "A password reset link has been sent to your email account. Please check your inbox." });
	} catch (error) {
		res.status(500).send({ message: "An internal server error occurred. Please try again later." });
	}
});

// Verifying the password reset link
router.get("/:id/:token", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "The link provided appears to be either invalid or expired." });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "The link provided appears to be either invalid or expired." });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "An internal server error occurred. Please try again later." });
	}
});

// Setting a new password
router.post("/:id/:token", async (req, res) => {
	try {
		const passwordSchema = Joi.object({
			password: passwordComplexity().required().label("Password"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "The link provided appears to be either invalid or expired." });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "The link provided appears to be either invalid or expired." });

		if (!user.verified) user.verified = true;

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user.password = hashPassword;
		await user.save();
		await token.remove();

		res.status(200).send({
			message: "Password reset successful. Your password has been updated."
		});
	} catch (error) {
		res.status(500).send({ message: "Something went wrong on our end. Please try again later." });
	}
});

module.exports = router;