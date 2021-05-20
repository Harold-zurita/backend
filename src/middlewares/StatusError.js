const { validationResult } = require('express-validator');

const StatusError = (req, res, next) => {

    const errores = validationResult(req);

    if(!errores.isEmpty()){

        return res.status(404).json(errores);
        
    }

    next();

}

module.exports = StatusError;