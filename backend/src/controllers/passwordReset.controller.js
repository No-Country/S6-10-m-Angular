const nodemailer = require('nodemailer');

const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcryptjs');

const { encryptPassword } = require('../helpers/bcrypt');

const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync');


const passwordEmail = catchAsync(async (req, res, next) => {

    const { email } = req.body;
    try {
        // Check if the email is valid and exists in the database
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send('Invalid email address');
        }
  
        // Generate a password reset token and save it to the database
        const token = uuidv4();
        const hashedToken = bcrypt.hashSync(token, 8);
        const now = new Date();
        // const expires = new Date(now.getTime() + 3600000); // 1 hour
        await user.update({
            resetToken: token,
            // reset_password_expires: expires,
        });
  
        // Create a nodemailer transporter object
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USEREMAIL,
                pass: process.env.PASSMAIL,
            },
        });
  
        // Define the email message
        const resetUrl = `http://localhost:8080/reset-password/${token}`;
        const mailOptions = {
            from: process.env.USEREMAIL,
            to: email,
            subject: 'Recuperacion de contraseña',
            text: `Hace click en el siguiente link para cambiar tu contraseña: ${resetUrl}`,
            html: `<p>Hace click en el siguiente link para cambiar tu contraseña:</p><a href="${resetUrl}">Reset Password</a>`,
        };
  
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                //   console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent successfully');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }




});


const passwordReset = catchAsync(async (req, res, next) => { 

    const { password } = req.body;
    console.log('password', password);
    const { token } = req.params;
    console.log('hello world!');
    console.log('token', token);
    try {
      // Find the user with the given reset token
    const user = await User.findOne({ where: { resetToken: token } });
    console.log('user', user);
    if (!user) {
    return res.status(400).send('Invalid or expired password reset token');
}

  // Check if the token is still valid
  // const now = new Date();
  // if (now > user.reset_password_expires) {
  //   return res.status(400).send('Invalid or expired password reset token');
  // }
  
  // Hash the new password and update the user's password
  // const hashedPassword = bcrypt.hashSync(password, 8);
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  await user.update({ password: hashedPassword });
  
  
  // Clear the reset token and expiration time
  await user.update({
    resetToken: null,
    // reset_password_expires: null,
  });
  
  res.status(200).send('Password reset successfully');} catch (error) {
  console.error(error);
  res.status(500).send('Server error');
  }

});

module.exports = { passwordEmail, passwordReset }
