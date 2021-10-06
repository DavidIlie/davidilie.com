import { NextApiRequest, NextApiResponse } from "next";

import { ContactValidationSchema } from "@modules/landing/ContactForm";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const body = await ContactValidationSchema.validate(req.body);

            let nodemailer = require("nodemailer");

            const transporter = nodemailer.createTransport({
                port: 587,
                host: "smtp.gmail.com",
                auth: {
                    user: "david@davidilie.com",
                    pass: process.env.GMAIL_PASSWORD,
                },
                secure: false,
                requireTLS: true,
            });

            const mailData = {
                to: "david@davidilie.com",
                subject: `Contact email from ${body.name} - ${body.title}`,
                from: body.email,
                text: body.message,
            };

            try {
                transporter.sendMail(mailData, (err: Error, info: any) => {
                    if (err) {
                        res.status(500).json({ message: "mail send error" });
                    } else {
                        res.status(200).json({ message: "did it" });
                    }
                });
            } catch (error) {
                res.status(500).json({ message: "catched error" });
            }
        } else {
            return res.status(400).json({ message: "im fine thank you" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export default handler;
