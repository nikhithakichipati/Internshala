import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",      
  user: "schoolproject",           
  password: "nikkie1608", 
  database: "schooldb"   
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log(" MySQL Connected...");
});

export default db;
