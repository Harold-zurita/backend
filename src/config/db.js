const mysql = require('mysql');

const MariaConexion = () => {

    return mysql.createConnection({
        
        host: process.env.HOST_NAME,
        user: process.env.USER_NAME,
        password: process.env.PASS_NAME,
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
