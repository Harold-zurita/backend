const { Router } = require('express');
const RecetaRouter = Router();

const {check} = require('express-validator');
const StatusError = require('../middlewares/StatusError');

/**Controlador */
const { RecetaGet, RegistrarRecetas, uploadImage} = require('../controllers/Recetas');

RecetaRouter.get('/getRecetas', (req, res) => RecetaGet(req, res));

RecetaRouter.post('/registrar',[

    check('nombReceta', 'es requerido, Error').notEmpty(),
    check('dificultad', 'es requerido, Error').notEmpty(),
    check('categoria', 'es requerido, Error').notEmpty(),
    check('ingredientes', 'es requerido, Error').notEmpty(),
    check('preparacion', 'es requerido, Error').notEmpty(),
    check('tiempoPrepa', 'es requerido, Error').notEmpty(),
    check('imagen', 'obligatorio').notEmpty(),
    check('imagen').custom((img)=> {

        let separar = img.split('.');
        console.log(separar);
        const extension = separar[separar.length-1];
        if(extension ==='jpg' || extension ==='JPEG' || extension ==='png' || extension ==='JPG' || extension ==='PNG' || extension === 'jpeg'){
            return img;
        }else{
            throw new Error('solo se permite imagenes tipo jpg, png, JPEG');
        }

    }),
    StatusError

], (req, res)=> RegistrarRecetas(req, res));

RecetaRouter.post('/uploadImage', (req,res) => uploadImage(req, res))

module.exports = RecetaRouter;