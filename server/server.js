// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static("public"));

// Nodemailer setup
const transporter = nodemailer.createTransport({
	service: "gmail", // Or your preferred email service
	auth: {
		user: "mrchreesa@gmail.com", // Your email address
		pass: "lbrqhfpjzomduxuu", // Your email password
	},
});

app.post("/send-email", (req, res) => {
	const { name, surname, email, phone, message } = req.body;

	const mailOptions = {
		from: email, // sender address
		to: "mrchreesa@gmail.com", // receiver's email
		subject: `New appointment request from ${name} ${surname}`,
        text: `
            Name: ${name} ${surname}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        `,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).send(error.toString());
		}
		res.status(200).send("Email sent successfully!");
	});
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});