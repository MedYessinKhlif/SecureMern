const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with provided email already exists. Please use a different email." });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;

        await sendEmail(user.email, "Please verify your email address.", url);

        res.status(201).send({ message: "Verification email sent. Please check your inbox." });
    } catch (error) {
        console.error("Sign-up error:", error);
        res.status(500).send({ message: "Something went wrong on our end. Please try again later." });
    }
});

router.get("/:id/verify/:token", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send({ message: "Invalid link. Please check and try again." });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link. Please check and try again." });

        await User.updateOne({ _id: user._id }, { verified: true });
        await token.remove();

        res.status(200).send({
            message: "Email verification successful."
        });
    } catch (error) {
        console.error("Email verification error:", error);
        res.status(500).send({ message: "Something went wrong on our end. Please try again later." });
    }
});

module.exports = router;
