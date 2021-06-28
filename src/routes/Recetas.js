const { Router } = require('express');
const RecetaRouter = Router();
const {check} = require('express-validator');
const StatusError = require('../middlewares/StatusError');

/**Controlador */
const {RecetaGet, RegistrarRecetas, uploadImage} = require('../controllers/Recetas');

RecetaRouter.get('/getRecetas', (req, res) => RecetaGet(req, res));

RecetaRouter.post('/registrar',[

    check('nombReceta', 'Nombre es requerido, Error').notEmpty(),
    check('dificultad', 'Dificultad es requerido, Error').notEmpty(),
    check('categoria', 'Categoría es requerido, Error').notEmpty(),
    check('ingredientes', 'Ingredientes es requerido, Error').notEmpty(),
    check('preparacion', ' Preparación es requerido, Error').notEmpty(),
    check('tiempoPrepa', 'Tiempo es requerido, Error').notEmpty(),
    check('imagen', 'Imagen obligatorio').notEmpty(),
    check('imagen').custom( async(img)=> {

        let separar = img.split('.');
        const extension = separar[separar.length-1];
        if(extension ==='jpg' || extension ==='JPEG' || extension ==='png' || extension ==='JPG' || extension ==='PNG' || extension === 'jpeg'){
            return img;
        }else{
            throw new Error('solo se permite imagenes tipo jpg, png, JPEG');
        }

    }),
    StatusError

],(req, res) => RegistrarRecetas(req, res));

RecetaRouter.post('/uploadImage', (req, res) => uploadImage(req, res))

module.exports = RecetaRouter;
