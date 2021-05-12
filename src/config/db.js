const mysql = require('mysql');

const MariaConexion = () => {

    return mysql.createConnection({
        
        host: "mysql-antoniomonje.alwaysdata.net",
        user: "234882_harold",
        password: "zurita1024!",
        database: "antoniomonje_menugement_db"
        
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
