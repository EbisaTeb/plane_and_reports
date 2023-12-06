
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path =require('path')
const PORT = 3000;
const app = express();
const salt=10;
app.use(cookieParser());
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cors(
{
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies, if applicable
}
));
// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace 'root' with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'planandreports', // Replace 'mydb' with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database! e');
});

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to save multiple table data to the database
app.post('/api/save-tables', (req, res) => {
  const tables = req.body; // Array of tables received in the request

  // Save each table to the database
  tables.forEach((table) => {
    const { fileName, id, columns, rows } = table;

    // Prepare the data for insertion into the database
    const tableData = {
      fileName: fileName,
      tableId: id,
      columns: JSON.stringify(columns),
      rows: JSON.stringify(rows),
    };

    // Insert the table data into the database
    connection.query('INSERT INTO myfiletable SET ?', tableData, (err, result) => {
      if (err) {
        console.error('Error saving table to database:', err);
        res.status(500).json({ message: 'Error saving table to database' });
        return;
      }
      console.log(`Table ${id} data saved to database!`);
    });
  });

  res.json({ message: 'Tables data saved to database' });
});

// Endpoint to get all table data from the database
app.get('/api/get-tables', (req, res) => {
  // Your logic to fetch the table data from the database goes here
  // For example:
  connection.query('SELECT * FROM myfiletable', (err, result) => {
    if (err) {
      console.error('Error fetching table data:', err);
      res.status(500).json({ message: 'Error fetching table data' });
    } else {
      res.json(result);
    }
  });
});

//admin information 
app.get('/getEmployee', (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, (err, result) => {
      if(err) return res.json({Error: "Get employee error in sql"});
      return res.json({Status: "Success", Result: result})
  })
})
app.get('/getEmployee/:ID', (req, res) => {
  const ID= req.params.ID;
  const sql = "SELECT * FROM users where ID = ?";
  connection.query(sql, [ID], (err, result) => {
      if(err) return res.json({Error: "Get users error in sql"});
      return res.json({Status: "Success", Result: result})
  })
})

app.put('/update/:ID', (req, res) => {
  const ID = req.params.ID;
  const saltRounds = 10; 
  const newPassword = req.body.Password;
  // Hash the password
  bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.json({ Error: "Password hashing error" });
    }

    const sql = "UPDATE users SET ID = ?, Firstname = ?, Middlename = ?, Lastname = ?, Gender = ?, email = ?, Password = ?, Department = ?, Role = ? WHERE ID = ?";
    
    connection.query(sql, [ req.body.ID, req.body.Firstname, req.body.Middlename,req.body.Lastname, req.body.Gender, req.body.email, hashedPassword, req.body.Department,req.body.Role,ID], (err, result) => {
      if (err) {
        return res.json({ Error: "Update users error in SQL" });
      }
      return res.json({ Status: "Success" });
    });
  });
});

app.delete('/delete/:ID', (req, res) => {
  const ID = req.params.ID;
  const sql = "Delete FROM users WHERE ID = ?";
  connection.query(sql, [ID], (err, result) => {
      if(err) return res.json({Error: "delete employee error in sql"});
      return res.json({Status: "Success"})
  })
})

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token verification error", Details: err });
      req.Role = decoded.Role;
      req.ID = decoded.ID;
      req.Password = decoded.Password;
      console.log("User ID in verifyUser middleware:", req.ID);
      next();
    });
  }
};

app.get('/dashboard',verifyUser, (req, res) => {
  return res.json({Status: "Success", Role: req.Role, ID: req.ID})
})

app.get('/adminCount', (req, res) => {
  const sql = 'SELECT COUNT(*) AS admin FROM users WHERE Role="admin"';
  connection.query(sql, (err, result) => {
      if(err) return res.json({Error: "Error in runnig query"});
      return res.json(result);
  })
})
app.get('/employeeCount', (req, res) => {
  const sql ='SELECT COUNT(*) AS admin FROM users WHERE Role!="admin"';
  connection.query(sql, (err, result) => {
      if(err) return res.json({Error: "Error in runnig query"});
      return res.json(result);
  })
})

app.get('/genderCount', (req, res) => {
  const sqlFemale = 'SELECT COUNT(*) AS female FROM users WHERE Gender = "female"';
  const sqlMale = 'SELECT COUNT(*) AS male FROM users WHERE Gender = "male"';

  const genderCounts = {};

  connection.query(sqlFemale, (err, femaleResult) => {
    if (err) return res.json({ Error: "Error in running female query" });

    genderCounts.female = femaleResult[0].female;

    connection.query(sqlMale, (err, maleResult) => {
      if (err) return res.json({ Error: "Error in running male query" });

      genderCounts.male = maleResult[0].male;

      return res.json(genderCounts);
    });
  });
});

app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM users WHERE ID = ? AND Password = ?';
  connection.query(sql, [req.body.ID, req.body.Password], (err, result) => {
    if (err) {
      console.error('Error running login query:', err);
      return res.json({ Status: 'Error', Error: 'Error in running query' });
    }
    if (result.length > 0) {
      bcrypt.compare(req.body.Password.toString(), result[0].Password)
      const user = result[0];
      const role = user.Role;
      const token = jwt.sign({ Role: role, ID: user.ID }, 'jwt-secret-key', { expiresIn: '1d' });
      console.log("Generated Token Payload:", { Role: role, ID: user.ID });
      res.cookie('token', token);
      return res.json({ Status: 'Success', Role: role });
    } else {
      console.log("Wrong ID or Password");
      return res.json({ Status: 'Error', Error: 'Wrong ID or Password' });
    }
  });
});



app.post('/employeelogin', (req, res) => {
  const sql = "SELECT * FROM users Where email = ?";
  connection.query(sql, [req.body.email], (err, result) => {
      if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
      if(result.length > 0) {
          bcrypt.compare(req.body.Password.toString(), result[0].Password, (err, response)=> {
              if(err) return res.json({Error: "password error"});
              if(response) {
                  const token = jwt.sign({Role: "employee", id: result[0].ID}, "jwt-secret-key", {expiresIn: '1d'});
                  res.cookie('token', token);
                  return res.json({Status: "Success", id: result[0].ID})
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
  
app.use(bodyParser.json());

app.post('/create', (req, res) => {
  if (req.body.Password === undefined) {
    return res.json({ Error: "Password is undefined" });
  }

  const sql = "INSERT INTO users (`ID`, `Firstname`, `Middlename`, `Lastname`, `Gender`, `email`, `Password`, `Department`, `Role`) VALUES (?)";

  bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
    if (err) {
      console.error("Error in hashing password:", err);
      return res.json({ Error: "Error in hashing password" });
    }

    const values = [
      req.body.ID,
      req.body.Firstname,
      req.body.Middlename,
      req.body.Lastname,
      req.body.Gender,
      req.body.email,
      hash,
      req.body.Department,
      req.body.Role
    ];

    // console.log("SQL Query:", sql);
    // console.log("Query Parameters:", values);

    connection.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.json({ Error: "Error executing SQL query" });
      }
      return res.json({ Status: "Success" });
    });
  });
});

app.get('/api/profile', verifyUser, (req, res) => {
  const userId = req.ID;
  const sql = 'SELECT Firstname, Middlename, Lastname, email,Role,Department FROM users WHERE ID = ?';
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.json({ Status: 'Error', Error: 'Error fetching user details' });
    }
    if (result.length > 0) {
      console.log("User details fetched:", result[0]);
      return res.json({ Status: 'Success', Profile: result[0] });
    } else {
      console.log("User not found");
      return res.json({ Status: 'Error', Error: 'User not found' });
    }
  });
});
// ...

app.put('/change-password', verifyUser, (req, res) => {
  const userId = req.ID;
  const { currentPassword, newPassword } = req.body;

  // Verify the current password before allowing the change
  const getCurrentPasswordSql = 'SELECT Password FROM users WHERE ID = ?';
  connection.query(getCurrentPasswordSql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching current password:', err);
      return res.json({ Status: 'Error', Error: 'Error fetching current password' });
    }

    if (result.length > 0) {
      const storedPassword = result[0].Password;

      // Log the current and stored passwords
      console.log('Entered Password Hex Codes:', Buffer.from(currentPassword, 'utf-8').toString('hex'));
      console.log('Stored Password Hex Codes:', Buffer.from(storedPassword, 'utf-8').toString('hex'));

      // Compare the current password with the stored password
      bcrypt.compare(currentPassword, storedPassword, (compareErr, isMatch) => {
        if (compareErr) {
          console.error('Error comparing passwords:', compareErr);
          return res.json({ Status: 'Error', Error: 'Error comparing passwords' });
        }

        console.log('Password Comparison Result:', isMatch);

        if (isMatch) {
          // Hash the new password before updating it in the database
          bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
              console.error('Error hashing new password:', hashErr);
              return res.json({ Status: 'Error', Error: 'Error hashing new password' });
            }

            // Update the password in the database
            const updatePasswordSql = 'UPDATE users SET Password = ? WHERE ID = ?';
            connection.query(updatePasswordSql, [hashedPassword, userId], (updateErr, updateResult) => {
              if (updateErr) {
                console.error('Error updating password:', updateErr);
                return res.json({ Status: 'Error', Error: 'Error updating password' });
              }

              return res.json({ Status: 'Success', Message: 'Password updated successfully' });
            });
          });
        } else {
          console.log('Password comparison failed. Entered password does not match stored password.');
          return res.json({ Status: 'Error', Error: 'Current password is incorrect' });
        }
      });
    } else {
      console.log('User not found.');
      return res.json({ Status: 'Error', Error: 'User not found' });
    }
  });
});



// ...


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
