const mysql = require('mysql');

const MariaConexion = () => {

    return mysql.createConnection({
        
        host: "mysql-antoniomonje.alwaysdata.net",
        user: "234882_harold",
        password: "zurita1024!",
        database: "antoniomonje_menugement_db"
        
    });

}

module.exports = MariaConexion;
