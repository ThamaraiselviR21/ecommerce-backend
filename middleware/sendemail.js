const { createTransport } = require("nodemailer");

const sendMail = async (email, subject, text) => {
    try {
        const trans = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: process.env.GMAIL, // Your email address
                pass: process.env.GPASS, // Your email password or app-specific password
            },
        });

        // Send mail
        await trans.sendMail({
            from: process.env.GMAIL,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

module.exports = sendMail;
