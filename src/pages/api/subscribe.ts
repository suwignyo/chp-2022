import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, firstName, lastName, token } = req.body;
  const msg = {
    to: email,
    from: "gerchelle.2022@gmail.com",
    subject: "Thank you for subscribing",
    name: `${firstName} ${lastName}`,
    text: "Message body",
  };

  const human = await validateHuman(token);
  if (!human) {
    res.status(400);
    res.json({ errors: ["Bot."] });
    return;
  }

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
};

async function validateHuman(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data.success;
}
