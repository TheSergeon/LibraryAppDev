const sql = require("mssql/msnodesqlv8");//Adding mssql
const express = require('express'); //Adding Express
const bodyParser = require('body-parser');//Using parser to take in fields
//Setting up variables for express app and MS Sql config
const app = express();
const port = process.env.PORT || 3000; // Set the port
var config = {
    server:"libappdev.database.windows.net",
    database:"libappdev",
    driver:"msnodesqlv8",
    user: "library_admin",
    password: "Team14UMA",
    options:{
        trustedconnection: true,
    }
}
// Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to the database
sql.connect(config, (err) => {
    if (err) {
      console.error('Database connection failed: ' + err.message);
    } else {
      console.log('Connected to the database');
    }
  });
  
  // Handle the form submission
  app.post('/register', (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
  
    const query = `
      INSERT INTO Users (user_id, first_name, last_name, username, email)
      VALUES ('1','${firstname}','${lastname}','${username}', '${email}')
    `; //TO DO: NEED TO ADD PASSWORD BACK IN - , '${password}'
  
    const request = new sql.Request();
    request.query(query, (err) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        return res.status(500).send('An error occurred while processing the request.');
      }
  
      console.log('User registered successfully');
      res.status(201).send('User registered successfully.');
    });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

/*
console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
        app.post('/register', (req, res) => {
            const { username, email, password } = req.body;
          
            const query = `
              INSERT INTO Users (username, email, password)
              VALUES ('${username}', '${email}', '${password}')
            `;
          
        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`Select * from users`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("%s\t%s", row.CategoryName, row.ProductName);
        });

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}*/