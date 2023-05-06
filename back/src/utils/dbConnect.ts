
const mysql = require('mysql2')

// let ENV = process.env.ENVIRONNEMENT || ""

abstract class DbConnect {
  protected connection;
  

  constructor() {
    let connectString = process.env.DATABASE_URL || 'mysql://root:root@localhost/planetscale'
    this.connection = mysql.createConnection(connectString);
  }

  close() {
    setTimeout(()=>{
      this.connection.end();
    },1)
  }

}
export default DbConnect;