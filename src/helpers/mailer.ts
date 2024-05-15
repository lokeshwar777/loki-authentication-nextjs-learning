import User from '@/models/userModel'
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    if (!userId) {
      throw new Error('userId is undefined or null')
    }

    const hashedToken = await bcryptjs.hash(userId?.toString(), 10)

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000
        }
      })
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000
        }
      })
    }

    const transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'lokeshwar777@asgard.com',
        pass: 'jn7jnAPss4f63QBp6D'
      }
    })

    const mailOptions = {
      from: '"Mallepally Lokeshwar Reddy" <lokeshwar777@asgard.com>',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click 
      <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
      here </a> 
      to ${
        emailType === 'VERIFY'
      } ? 'verify your email' : 'reset your password'}
      or copy and paste the link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    console.error('Error sending email', error)
    throw new Error(error.message)
  }
}
