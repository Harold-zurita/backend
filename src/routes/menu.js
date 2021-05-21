const MariaConexion = require('../config/db');
const { Router } = require('express');
const MenuRouter = Router();
const {check} = require('express-validator');
const StatusError = require('../middlewares/StatusError');

/**Controlador */

MenuRouter.post('/nuevoMenu', [
    check("NOMBREMENU","EL NOMBRE DEL MENU ES OBLIGATORIO").notEmpty(),
    check("IDDESAYUNO","EL DESAYUNO DEL MENU ES OBLIGATORIO").notEmpty(),
    check("IDALMUERZO","EL ALMUERZO DEL MENU ES OBLIGATORIO").notEmpty(),
    check("IDCENA","LA CENA DEL MENU ES OBLIGATORIO").notEmpty(),
    StatusError
], (req, res) => {
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

                MariaConexion.query(`INSERT INTO menu VALUES (null, "${NOMBREMENU}", ${IDDESAYUNO}, ${IDALMUERZO}, ${IDCENA})`, function (error, results, fields) {
                    if (error) throw error;
                    return res.json(results);
                });
            }

        }
        
    });
});

MenuRouter.get('/getMenu', (req,res)=>{
    MariaConexion.query(`SELECT ID, NOMBREMENU, NOMBRERECETA FROM menu, receta WHERE IDDESAYUNO = ID_RECETA or IDALMUERZO = ID_RECETA or IDCENA = ID_RECETA`, async(error, results, fields) => {
        if (error){
            console.log(error);
        }
        res.json(results);
        
    });
} );


module.exports = MenuRouter;
