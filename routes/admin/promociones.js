var express = require('express');
var router = express.Router();
var promocionesModel = require('../../models/promocionesModel');

router.get('/', async function (req, res, next) {
    var promociones = await promocionesModel.getPromociones();
    res.render('admin/promociones', {
        layout:'admin/layout',
        persona: req.session.nombre,
        promociones
    });
});

router.get('/eliminar/:id', async (req, res, next) => {
    var id =req.params.id;
    await promocionesModel.deletePromocionesById(id);
    res.redirect('/admin/promociones')
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.cuerpo != "" && req.body.vigencia != "") {
            await promocionesModel.insertPromociones(req.body);
            res.redirect('/admin/promociones')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, 
                message: 'Todos los campos son requeridos'
            })
        }
    }   catch (error) {
        console.log(error)
        res.render('/admin/agregar', {
            layout: 'admin/layout',
            error: true, 
            message: 'No se cargo la promocion'
        })
    }
})

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var promocion = await promocionesModel.getPromocionesById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        promocion
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            cuerpo: req.body.cuerpo,
            vigencia: req.body.vigencia
        }

    console.log(obj)
    await promocionesModel.modificarPromocionesById(obj, req.body.id);
    res.redirect('/admin/promociones');
    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true, 
            message: 'La promocion no fue modificada'
        })
    }
});


module.exports = router;