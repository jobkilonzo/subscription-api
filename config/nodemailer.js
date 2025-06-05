import nodemailer from "nodemailer";
import {EMAIL_PASSWORDS} from "./env.js";
export const accountEmail = "jobkilonzo95@gmail.com"
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORDS
    }
})

export default transporter