const MariaConexion = require('../config/db');
const path = require('path');

class RecetaController{

    RecetaGet(req, res){

        const db = MariaConexion();

        db.connect();

        const querySQL = `SELECT * FROM receta`;
        
        db.query(querySQL, (err, rows, fields)=>{
            
            if(err){
                
                console.log(err);
                throw new Error("La consulta esta fallando");

            }

            rows.map(function(item, pos){

                console.log(item)

            })

            console.log(rows.IMAGEN);
            
            res.json({rows});

        });

        db.end();

    }

    async RegistrarRecetas(req, res){

        const db = MariaConexion();

        //console.log(req.body);
        const{imagen, nombReceta, dificultad, categoria,ingredientes, preparacion, tiempoPrepa} = req.body
        
        db.connect();

        const querySQL = `INSERT INTO receta VALUES(null, "${nombReceta}", "${dificultad}", "${tiempoPrepa+' minutos'}", "${categoria}", "${imagen}", "${preparacion}", "${ingredientes}")`;
        
        db.query(querySQL, (err, rows, fields)=>{
            
            if(err){

                console.log(err);
                throw new Error("La consulta esta fallando");

            }

            console.log(rows);

            res.json({

                nombReceta,
                dificultad,
                tiempoPrepa,
                categoria,
                imagen,
                preparacion,
                ingredientes,

            });

        });

        db.end();

    }

    uploadImage(req, res){

        if(!req.files || !req.files.file){

            return res.json({
                mensaje: "Error"

            });

        }
        

        const {file} = req.files;

        let separar = (file.name).split('.');
        console.log(separar);
        const extension = separar[separar.length-1];
        if(!(extension ==='jpg' || extension ==='JPEG' || extension ==='png' || extension ==='JPG' || extension ==='PNG' || extension === 'jpeg')){
            return res.json({
                errors: [{
                    msg: 'solo se permite imagenes tipo jpg, png, JPEG'
                }]
            });
    
        }
        console.log(file);
        const dir = path.join(__dirname, "../images", file.name)
        console.log(dir);
    
        file.mv(dir, (err) => {

            if(err){

                console.log(err);
                return res.json({
                    mensaje: "Error"

                });

            }

        });

    }

}

module.exports = new RecetaController;