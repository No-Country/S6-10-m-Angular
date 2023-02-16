//Modificar rutas

app.post ("/views/index.hbs", (req, res) =>{
    const { usuario,email,especialidad,profesional,sanatorio,diaTurno,horaTurno } = req.body;
      console.log(usuario);
      console.log(email);
      console.log(especialidad);
      console.log(profesional);
      console.log(sanatorio);
      console.log(diaTurno);
      console.log(horaTurno);
      async function envioMail(){
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
          html:`Hola ${usuario}. Te confirmamos la reserva de tu turno para la especialidad ${especialidad},
          con el/la ${profesional} en el sanatorio ${sanatorio} el dia ${diaTurno} a las ${horaTurno}.
          Si queres modificar tu turno ingresa al siguiente link .......... `
        })
          res.render("confirmacionTurno");
      }
      envioMail()
  });

  module.exports = {
    nodemailer
  }