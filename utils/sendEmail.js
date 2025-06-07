import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import ENV from "../config/env.js";
import { transporter } from "../config/nodemailer.js";

export const sendRemainderEmail = async ({ to, type, subscription }) => {
    if(!to || !type){
        throw new Error('Missing required parameters');
    }

    const template = emailTemplates.find((type) => {
        return type.label === type
    });

    if(!template){
        throw new Error('Invalid email type');
    }

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: ENV.SENDER_EMAIL,
        to: to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            return console.log('Error sending emails: ',err);
        }
        console.log('Email sent' + info.response);
    });
}