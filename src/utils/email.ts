import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

interface User {
  email: string
  username: string
}

interface EmailOptions {
  to: string
  username: string
  url: string
  from: string
  subject: string
  html: string
  text: string
}

const Email = (user: User, url: string): {
  sendWelcome: () => Promise<any>
  sendPasswordReset: () => Promise<void>
} => {
  const to = user.email
  const from = `Sammy <${process.env.EMAIL_FROM}>`

  const newTransport = async (): Promise<any> => {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      })
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  const send = async (template: string, subject: string): Promise<void> => {
    // 1) Render HTML based on a pug template
    const html = `
      <div> ${template} </div>
    `
    // 2) Define email options
    const mailOptions: EmailOptions = {
      from,
      to,
      subject,
      html,
      text: html,
      username: user.username,
      url: url
    }

    // 3) Create a transport and send email
    const transport = await newTransport()
    await transport.sendMail(mailOptions)
  }

  const sendWelcome = async (): Promise<any> => {
    await send('welcome', 'Welcome to the Natours Family!')
  }

  const sendPasswordReset = async (): Promise<void> => {
    await send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    )
  }

  return {
    sendWelcome,
    sendPasswordReset
  }
}

export default Email
