//Modificar rutas

app.post ("/", (req, res) =>{
    const { user,email,especialidad,profesional,sanatorio,diaTurno,horaTurno } = req.body;
      async function mailConfirmacion(){
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.USEREMAIL,
            pass: process.env.PASSMAIL
          }
        });
        let envio = await transporter.sendMail({
          from: process.env.USEREMAIL,
          to: `${email}`,
          subject:"Reserva de turno",
          html:`Hola ${user}. Te confirmamos la reserva de tu turno para la especialidad ${especialidad},
          con el/la dr./dra. ${profesional} en el sanatorio ${sanatorio} el dia ${diaTurno} a las ${horaTurno}.
          Si queres modificar tu turno ingresa al siguiente link .......... `
        })
      }
      mailConfirmacion()
  });

  module.exports = {
    nodemailer
  }