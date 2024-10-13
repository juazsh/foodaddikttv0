
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'mail.tychhexagon.com',
    port: 465,
    secure: true,
    auth: {
        user: '',
        password: ''
    }
})