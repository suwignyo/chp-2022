import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.body", req.body);
  const { email, firstName, lastName } = req.body;
  const msg = {
    to: email,
    from: "gerchelle.2022@gmail.com",
    subject: "Thank you for subscribing",
    name: `${firstName} ${lastName}`,
    text: "Message body",
  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
};
