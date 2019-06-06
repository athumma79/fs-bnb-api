const mysql = require("mysql");

const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "fs_bnb"
}
const connection = mysql.createConnection(config);
connection.connect((err) => {
    if(err) {
        console.log(err);
    }
    console.log("database connected: " + config.host + ":" + config.port);
});

module.exports = connection;
