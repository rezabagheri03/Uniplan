import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({ /* SMTP config */ })

const sendEmail = async (options:any) => {
    await transporter.sendMail(options)
}

export default { sendEmail }
