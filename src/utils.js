import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);

  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = (email) => {
    const options = {
        auth: {
            api_key: process.env.MAILGUN_API,
            domain: process.env.MAILGUN_DOMAIN
        }
        
    };
    const client = nodemailer.createTransport(mgTransport(options));
    return client.sendMail(email);

};


export const sendSecretMail = (address, secret) => {
    const email = {
        from: "Manager@papergram.com",
        to: address,
        subject: "Login Secrete for Papergram",
        html: `Hello! Your Login secret is <strong>${secret}<strong/>. Copy paste on the app/website to log in`

    };
    return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

