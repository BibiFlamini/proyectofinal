var express = require('express');
var router = express.Router();
var promocionesModel = require('../models/promocionesModel');
var cloudinary = require('cloudinary').v2;


/* GET home page. */
router.get('/', async function(req, res, next) {
  var promociones = await promocionesModel.getPromociones();

      promociones = promociones.splice(0, 5);

      promociones = promociones.map(promocion => {
        if (promocion.img_id) {
          const imagen = cloudinary.url(promocion.img_id, {
            width: 460,
            crop: 'fill'
          });
          return {
            ...promocion,
            imagen
          }
        } else {
          return {
            ...promocion,
            imagen: '/images/noimage.jpg'
          }
        }
      });
  res.render('promociones',{
    promociones
  });
});


module.exports = router;