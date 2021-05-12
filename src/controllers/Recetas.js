const MariaConexion = require('../config/db');
const path = require('path');

class RecetaController{

    RecetaGet(req, res){

        const querySQL = `SELECT * FROM receta`;
        
        MariaConexion.query(querySQL, (err, rows, fields)=>{

            if(err){
                throw new Error("La consulta esta fallando");
            }

            rows.map(function(item, pos){
                //console.log(item)
            })
            
            res.json({rows});

        });
        //db.end();
    }

    async RegistrarRecetas(req, res){

        const{imagen, nombReceta, dificultad, categoria,ingredientes, preparacion, tiempoPrepa} = req.body; 
        // ConexionDB.connect Esto ya esta incluido en db, comenta esta linea en todos lados
        MariaConexion.query(`SELECT * FROM receta WHERE NOMBRERECETA = "${nombReceta}"`, async(error, results, fields) => {
            if (error){
            console.log(error);
        }else{

            if(results.length != 0){
                return res.json({
                    errors: [
                        {
                            msg: "El nombre de la receta ya existe"
                        }
                    ]
                });

            }else{

                MariaConexion.query(`INSERT INTO receta VALUES (null, "${nombReceta}", "${dificultad}", "${tiempoPrepa+' minutos'}", "${categoria}", "${imagen}", "${preparacion}", "${ingredientes}")`, function (error, results, fields) {
                    if (error) throw error;
                    return res.json(results);
                });
            }

        }
        
    });
    //ConexionDB.end(); Comenta el end
    }

    uploadImage(req, res){

        if(!req.files || !req.files.file){

            return res.json({
                mensaje: "Error"
            });

        }

        const {file} = req.files;

        let separar = (file.name).split('.');

        const extension = separar[separar.length-1];

        if(!(extension ==='jpg' || extension ==='JPEG' || extension ==='png' || extension ==='JPG' || extension ==='PNG' || extension === 'jpeg')){
            return res.json({
                errors: [{
                    msg: 'solo se permite imagenes tipo jpg, png, JPEG'
                }]
            });
        }

        const dir = path.join(__dirname, "../images", file.name)
    
        file.mv(dir, (err) => {

            if(err){

                return res.json({
                    mensaje: "Error"
                });

            }

        });

    }

}

module.exports = new RecetaController;
