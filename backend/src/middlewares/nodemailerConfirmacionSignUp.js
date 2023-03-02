// Modificar rutas

const nodemailer = require('nodemailer')


async function envioMail(req, res) {
  const { firstName,email } = req.body;
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.USEREMAIL,
            pass: process.env.PASSMAIL
          }
        });
        const envio = await transporter.sendMail({
          from: process.env.USEREMAIL,
          to: `${email}`,
          subject:"Alta de usuario",
          html:`Bienvenido a la app de Citamed ${firstName}! Con nosotros vas a poder pedir, modificar y cancelar turnos medicos de manera facil y rapida. `
        })
}
  ;

  module.exports = {
    envioMail
  }