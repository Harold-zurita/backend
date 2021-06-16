const mysql = require('mysql');

const MariaConexion = mysql.createConnection({
        
    host: "mysql-harold.alwaysdata.net",
    user: "harold_zurita",
    password: "harry102424zurita",
    database: "harold_menugementsprint3"
        
});

MariaConexion.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Conectado');
    }
});

module.exports = MariaConexion;
