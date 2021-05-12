const mysql = require('mysql');

const MariaConexion = () => {

    return mysql.createConnection({
        
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASS_DB,
        database: process.env.DB_NAME
        
    });

}

MariaConexion.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Conectado');
    }
});

module.exports = MariaConexion;
