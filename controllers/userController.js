const { ReturnDocument } = require('mongodb');
const User = require('../models/userModel');

// Nodemailer
const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: 'tamimtalha834@gmail.com',
    pass: 'nphubheaugtkchme',
  },
});

// Create User
async function createUser(req, res) {
  const { name, email, password } = req.body;

  const errors = {};

  if (!name) errors.name = `Name required`;
  if (!email) errors.email = `Email required`;
  if (!password) errors.password = `Password required`;

  if (errors.name || errors.email || errors.password)
    return res.status(400).json(errors);

  const existingEmail = await User.findOne({ email: email });
  if (existingEmail)
    return res
      .status(400)
      .json({ message: `A user with this email ${email} already exists` });

  const create = new User({
    name: name,
    email: email,
    password: password,
  });

  create.save();

  // Nodemailer - template
  try {
    const info = await transporter.sendMail({
      from: '"Node Learning Lab" <tamimtalha834@gmail.com>', // sender address
      to: email, // list of recipients
      subject: 'One last step to get started!', // subject line
      html: `<div style="display:none;font-size:1px;color:#f4f6f9;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all"> Confirm your email address to activate your Node Learning Lab account. This verification link expires in 30 minutes. </div><div style="margin:0;padding:0;width:100%;background-color:#f4f6f9;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f4f6f9;width:100%"><tr><td align="center" style="padding:40px 16px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;max-width:600px;width:100%"><tr><td align="center" style="padding-bottom:24px"><table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt"><tr><td align="center" valign="middle" style="background-color:#2563eb;width:40px;height:40px;border-radius:10px;color:#ffffff;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:20px;font-weight:700;line-height:40px;text-align:center"> &#10003; </td><td valign="middle" style="padding-left:12px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:20px;font-weight:700;color:#0f172a;letter-spacing:-0.3px"> Node Learning Lab </td></tr></table></td></tr><tr><td style="background-color:#ffffff;border-radius:12px;padding:36px 32px;border:1px solid #e2e8f0;box-shadow:0 4px 12px rgba(15, 23, 42, 0.04)"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%"><tr><td align="left" style="padding-bottom:16px"><span style="display:inline-block;background-color:#eff6ff;color:#1d4ed8;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;padding:6px 12px;border-radius:9999px;border:1px solid #bfdbfe"> Account Verification </span></td></tr><tr><td align="left" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:24px;font-weight:700;color:#0f172a;line-height:1.3;padding-bottom:16px"> Verify your email address </td></tr><tr><td align="left" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.6;color:#334155;padding-bottom:24px"> Hi <strong style="color:#0f172a">${name}</strong>,<br><br> Thanks for signing up for <strong style="color:#0f172a">Node Learning Lab</strong>! To complete your registration and activate your account, please confirm your email address by clicking the button below. </td></tr><tr><td align="center" style="padding:8px 0 28px 0"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://example.com/verify-email?token={{verificationToken}}" style="height:48px;v-text-anchor:middle;width:240px" arcsize="17%" stroke="f" fillcolor="#2563eb"><w:anchorlock/><center style="color:#ffffff;font-family:Segoe UI,Arial,sans-serif;font-size:16px;font-weight:600">Verify Email Address</center></v:roundrect><![endif]--><!--[if !mso]></td></tr><tr><td align="left" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.6;color:#475569;padding-bottom:24px"> This verification link will expire in <strong style="color:#0f172a">30 minutes</strong>. If you did not create an account with Node Learning Lab, you can safely ignore or delete this email. </td></tr><tr><td style="border-top:1px solid #e2e8f0;padding-top:24px;font-size:1px;line-height:1px">&nbsp;</td></tr><tr><td align="left" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px"><p style="margin:0 0 8px 0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;color:#64748b"> If the button above doesn't work, copy and paste this link into your browser: </p><p style="margin:0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;word-break:break-all"> <a href="https://example.com/verify-email?token={{verificationToken}}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline"> {{verificationUrl}} </a></p></td></tr></table></td></tr><tr><td align="center" style="padding:24px 16px 0 16px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.6;color:#64748b"> Need help? Contact us at <a href="mailto:tamimtalha834@gmail.com" style="color:#2563eb;text-decoration:underline">tamimtalha834@gmail.com</a> <br> &copy; 2027 Node Learning Lab. All rights reserved. </td></tr></table></td></tr></table></div>`, // HTML body
    });

    console.log('Message sent: %s', info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error('Error while sending mail:', err);
  }

  res.status(200).json({ message: `Please verify your email` });
}

// Read all Users
async function readUser(req, res) {
  const readAll = await User.find({});
  //   console.log(readAll);
  res
    .status(200)
    .json({ message: `You have ${readAll.length} users so far!`, readAll });
}

// Delete User
async function removeUser(req, res) {
  const { id } = req.params;

  const existingId = await User.findOne({ _id: id });
  if (!existingId)
    return res
      .status(400)
      .json({ message: `No such user with the given ID found` });

  const remove = await User.findByIdAndDelete(id);
  res.status(200).json({
    message: `User with email ${remove.email} has been removed. Sad to see you go :(`,
  });
}

// Update User
async function updateUser(req, res) {
  const { id } = req.params;

  const existingId = User.findOne({ _id: id });
  if (!existingId)
    return res
      .status(200)
      .json({ message: `No such user found to be updated` });

  const change = await User.findByIdAndUpdate({ _id: id }, req.body, {
    returnDocument: 'after',
  });
  res
    .status(200)
    .json({ message: `User credentials has been updated!`, change });
}

const uploadImg = (req, res) =>
  res.status(200).json({ message: `Upload Successful` });

module.exports = { createUser, readUser, removeUser, updateUser, uploadImg };
