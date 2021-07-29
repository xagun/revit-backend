var mysql = require('mysql');

var mysqlConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'revitDB',
    multipleStatements: true
});


mysqlConnect.connect((err) =>{
    if(!err){
      console.log("db connection successful")
    }
    else{
      console.log("connection failed")
    }
  })

module.exports = mysqlConnect;


