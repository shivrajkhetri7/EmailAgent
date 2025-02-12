require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const readlineSync = require("readline-sync");
const nodemailer = require("nodemailer");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const sendMailtoUser = async ({ mailTo, message, subject }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSCODE,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: mailTo,
            subject: subject,
            text: message,
            html: `<p>${message}</p>`,
        });

        console.log("\n✅ Email sent successfully! Message ID:", info.messageId);
    } catch (error) {
        console.error("\n❌ Error sending email:", error.message);
    }
};

async function main() {
    console.log("📧 Email Assistant Initialized. Type 'exit' to quit.\n");

    while (true) {
        let userInput = readlineSync.question(">> ");

        if (userInput.toLowerCase() === "exit") {
            console.log("\n👋 Exiting... Have a great day!");
            break;
        }

        // AI Prompt to behave naturally and collect details
        let prompt = `
        You are an AI email assistant. Have a normal conversation to collect details for drafting an email.
        Ask natural follow-up questions, but don't assume details.
        Once you have the subject, message, and recipient, generate a final email and ask if they want to send it.
        
        User: ${userInput}
        Assistant:
        `;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        let responseText = result.response.text();
        console.log("\n🤖 Assistant:", responseText, "\n");

        // **Check if AI has generated a full email and ask for confirmation**
        if (
            responseText.includes("Subject:") &&
            responseText.includes("Message:") &&
            responseText.includes("To:")
        ) {
            let subjectMatch = responseText.match(/Subject:\s*(.*)/i);
            let messageMatch = responseText.match(/Message:\s*([\s\S]*)/i);
            let toMatch = responseText.match(/To:\s*(.*)/i);

            let emailDetails = {
                subject: subjectMatch ? subjectMatch[1].trim() : "",
                message: messageMatch ? messageMatch[1].trim() : "",
                mailTo: toMatch ? toMatch[1].trim() : "",
            };

            console.log("\n📩 Your email is ready:");
            console.log(`To: ${emailDetails.mailTo}`);
            console.log(`Subject: ${emailDetails.subject}`);
            console.log(`Message:\n${emailDetails.message}`);

            let confirmation = readlineSync.question("\nDo you want to send this email? (yes/no): ").toLowerCase();

            if (confirmation === "yes") {
                await sendMailtoUser(emailDetails);
                console.log("\n📧 Email sent successfully!");
            } else {
                console.log("\n❌ Email not sent. You can modify it and try again.");
            }
        }
    }
}

main();
