const MariaConexion = require('../config/db');
const { Router } = require('express');
const MenuRouter = Router();
const {check} = require('express-validator');
const StatusError = require('../middlewares/StatusError');

/**Controlador */

MenuRouter.post('/nuevoMenu', (req, res) => {
    const {NOMBREMENU,IDDESAYUNO,IDALMUERZO,IDCENA} = req.body;

    MariaConexion.query(`SELECT * FROM menu WHERE NOMBREMENU = "${NOMBREMENU}"`, async(error, results, fields) => {
        if (error){
            console.log(error);
        }else{

                if(results.length != 0){
                    return res.json({
                    errors: [
                        {
                            msg: "El nombre del menú ya existe"
                        }
                    ]
                });

                }else{

                MariaConexion.query(`INSERT INTO menu VALUES (null, ${NOMBREMENU}, ${IDDESAYUNO}, ${IDALMUERZO}, ${IDCENA})`, function (error, results, fields) {
                    if (error) throw error;
                    return res.json(results);
                });
            }

        }
        
    });
});


module.exports = MenuRouter;
