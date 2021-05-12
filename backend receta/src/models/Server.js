const express = require('express');
const cors = require('cors');
const upload = require('express-fileupload');

/**Rutas */
const RecetaRouter = require('../routes/Recetas');
const ImageRouter = require('../routes/Imagenes');

class Server{

    constructor(){

        this.server = express();

    }

    middleware(){

        this.server.use(upload({

            useTempFiles : true,
            tempFileDir : '/tmp/'

        }));

        this.server.use(express.json());//JSON
        this.server.use(cors());

    }

    rutas(){
        //Rutas
        this.server.use('/imagenes', ImageRouter);
        this.server.use('/receta', RecetaRouter);

    }

    start(){

        this.middleware();
        this.rutas();
        this.server.listen(process.env.PORT, () => {

            console.log(`Servidor en el puerto ${process.env.PORT} `);
            
        });

    }

}

module.exports = new Server;