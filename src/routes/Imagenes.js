const { Router } = require('express');
const ImageRouter = Router();
const path = require('path');

const {check} = require('express-validator');
const StatusError = require('../middlewares/StatusError');

/**Controlador */
ImageRouter.get('/imagen/:img', (req, res)=>{

    let {img} = req.params;
    let dir = path.join(__dirname, '../images', img);
    res.sendFile(dir);

})

module.exports = ImageRouter;