import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/smtp-transport";

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private configSer: ConfigService){
        this.transporter = nodemailer.createTransport({
            host: configSer.get("NODEMAILER_HOST"),
            port: configSer.get("NODEMAILER_PORT"),
            auth: {
                user: configSer.get("NODEMAILER_USER"),
                pass: configSer.get("NODEMAILER_PASS")
            }
        });
    }

    async sendPasswordResetEmail(toEmail: string, token: string){
        const resetLink = `${this.configSer.get("MAIN_URL")}/auth/reset-password?token=${token}`;
        console.log(resetLink);
        const mailOption: MailOptions = {
            from: this.configSer.get("NODEMAILER_USER"),
            to: toEmail,
            subject: "password reset request",
            html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`
            };
        console.log(mailOption);
        await this.transporter.sendMail(mailOption);
        }
    }
