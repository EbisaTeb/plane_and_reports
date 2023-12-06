const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser= require('cookies-parser');
const bcrypt=require('bcrypt')
const  jwt=require('jsonwebtoken')
const multer=require('multer')
const path =require('path')
const app = express();
const port = 3000; // You can change this port if needed
app.use(cors(
  {
      origin: "http://localhost:3001/", // Set to the exact origin of your frontend app
      methods: ["POST", "GET", "PUT"],
      credentials: true
  }
));
// app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username  

  password: '', // Replace with your MySQL password
  database: 'myfile', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Save data to MySQL database
app.post('/api/saveData', (req, res) => {
  const { tables } = req.body;

  if (!Array.isArray(tables)) {
    return res.status(400).json({ error: 'Invalid data format. Expecting an array of tables.' });
  }

  // Assuming you have a table named 'myfiletable' in the database
  const tableName = 'myfiletable';

  // Truncate the table to clear existing data (you may skip this if you want to keep existing data)
  db.query(`TRUNCATE TABLE ${tableName}`, (truncateErr) => {
    if (truncateErr) {
      console.error('Error truncating the table:', truncateErr);
      return res.status(500).json({ error: 'An error occurred while truncating the table.' });
    }

    // Insert new data into the table
    const insertQuery = `INSERT INTO ${tableName} (file_name, table_data) VALUES ?`;

    const values = tables.map((table) => [table.fileName, JSON.stringify(table)]);
    db.query(insertQuery, [values], (insertErr, results) => {
      if (insertErr) {
        console.error('Error inserting data into the table:', insertErr);
        return res.status(500).json({ error: 'An error occurred while inserting data into the table.' });
      }

      return res.json({ message: 'Data saved successfully!' });
    });
  });
});


// admin information 
app.get('/getEmployee', (req, res) => {
  const sql = "SELECT * FROM users";
  con.query(sql, (err, result) => {
      if(err) return res.json({Error: "Get employee error in sql"});
      return res.json({Status: "Success", Result: result})
  })
})

app.get('/get/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users where id = ?";
  con.query(sql, [id], (err, result) => {
      if(err) return res.json({Error: "Get employee error in sql"});
      return res.json({Status: "Success", Result: result})
  })
})
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE users set salary = ? WHERE id = ?";
  con.query(sql, [req.body.salary, id], (err, result) => {
      if(err) return res.json({Error: "update employee error in sql"});
      return res.json({Status: "Success"})
  })
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
      if(err) return res.json({Error: "delete employee error in sql"});
      return res.json({Status: "Success"})
  })
})

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
      return res.json({Error: "You are no Authenticated"});
  } else {
      jwt.verify(token, "jwt-secret-key", (err, decoded) => {
          if(err) return res.json({Error: "Token wrong"});
          req.role = decoded.role;
          req.id = decoded.id;
          next();
      } )
  }
}

app.get('/dashboard',verifyUser, (req, res) => {
  return res.json({Status: "Success", role: req.role, id: req.id})
})

app.get('/adminCount', (req, res) => {
  const sql = "Select count(id) as admin from users";
  db.query(sql, (err, result) => {
      if(err) return res.json({Error: "Error in runnig query"});
      return res.json(result);
  })
})
app.get('/employeeCount', (req, res) => {
  const sql = "Select count(id) as employee from users";
  db.query(sql, (err, result) => {
      if(err) return res.json({Error: "Error in runnig query"});
      return res.json(result);
  })
})

app.get('/salary', (req, res) => {
  const sql = "Select sum(salary) as sumOfSalary from users";
  db.query(sql, (err, result) => {
      if(err) return res.json({Error: "Error in runnig query"});
      return res.json(result);
  })
})

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM users Where email = ? AND  password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
      if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
      if(result.length > 0) {
          const id = result[0].id;
          const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
          res.cookie('token', token);
          return res.json({Status: "Success"})
      } else {
          return res.json({Status: "Error", Error: "Wrong Email or Password"});
      }
  })
})

app.post('/employeelogin', (req, res) => {
  const sql = "SELECT * FROM users Where email = ?";
  db.query(sql, [req.body.email], (err, result) => {
      if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
      if(result.length > 0) {
          bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
              if(err) return res.json({Error: "password error"});
              if(response) {
                  const token = jwt.sign({role: "employee", id: result[0].id}, "jwt-secret-key", {expiresIn: '1d'});
                  res.cookie('token', token);
                  return res.json({Status: "Success", id: result[0].id})
              } else {
                  return res.json({Status: "Error", Error: "Wrong Email or Password"});
              }
              
          })
          
      } else {
          return res.json({Status: "Error", Error: "Wrong Email or Password"});
      }
  })
})
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
