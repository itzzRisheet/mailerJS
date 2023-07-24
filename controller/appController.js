import * as nodemailer from "nodemailer";
import env from "../config.js";
import Mailgen from "mailgen";

// send mail from testing account
// didn' really work .. said some paid shit so let's just make our email
export async function signup(req, res) {
  // Generate test SMTP service account from ethereal.email
  // only needed if you don't  have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using Default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let msg = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter
    .sendMail(msg)
    .then(() => {
      return res.status(201).json({
        msg: "mail sent successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
}

export function getBill(req, res) {
  const { userEmail } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: env.EMAIL,
      pass: env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let mailgenerator = new Mailgen({
    theme: "default",
    product: {
      name: "mailgen",
      link: "https://google.com",
    },
  });

  let mailBody = {
    body: {
      name: "temp",
      intro: "temp message",
      table: {
        data: {
          item: "temp",
          description: "temp des",
          price: "$1B",
        },
      },
      outro: "Looking forward to create some badAss applications..POV: its just the start",
    },
  };

  // to generate the mail from mailBody variable
  // that must be the syntax to generate the email...
  let mail = mailgenerator.generate(mailBody);

  let message = {
    from: env.EMAIL,
    to: userEmail,
    subject: "Place order",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "Mail sent successfully...",
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
}
