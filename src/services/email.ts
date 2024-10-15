import nodemailer from 'nodemailer'

import config from '../config'

const transporter = nodemailer.createTransport({
    host: config.emailSettings.emailHost,
    port: config.emailSettings.emailPort,
    secure: true,
    auth: {
        user: config.emailSettings.emailAddress,
        pass: config.emailSettings.emailPassword
    }
})

export const sendMail = async (to: string, subject: string, emailBody: string) => {
    const mailOptions = {
        from: config.emailSettings.emailAddress,
        to,
        subject,
        html: emailBody
    }
    transporter.sendMail(mailOptions, (error, info) => {
        console.log(error)
        console.log(info)
    })
    
}