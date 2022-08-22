var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'lucerina23@gmail.com',
    subject: 'Contacto desde la Web',
    html: nombre + " " + apellido + " se contactó a través y quiere más info a este correo: " + email + ". <br> Además, hizo el siguiente comentario: " + mensaje + ".<br> Su tel es: " + tel
  }

  var transporter = nodemailer. createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente',
  })
});

module.exports = router;
