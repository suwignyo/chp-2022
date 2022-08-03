import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const RsvpInvite = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, url, firstName, lastName } = req.body;
  const msg = {
    to: email,
    from: { name: "Gerry & Michelle", email: "gerchelle.2022@gmail.com" },
    templateId: "d-0ff3411b2c044aab8a978d4a217f0ec2",
    personalizations: [
      {
        to: email,
        dynamicTemplateData: {
          url: url,
          firstName: firstName,
          lastName: lastName,
        },
      },
    ],
  };
  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
};

export default RsvpInvite;
