const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "Chandra",
    password: "Chandu90901@",
    database: "Angular",
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database!');
});


app.post('/api/form', (req, res) => {
    const { name, email, age } = req.body;
    const sql = 'INSERT INTO form (name, email, age) VALUES (?, ?, ?)';
    db.query(sql, [name, email, age], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Database insert error');
        } else {
            res.json({ message: 'User added successfully', id: results.insertId });
        }
    });
});

app.get('/api/form', (req, res) => {
    const sql = 'SELECT * FROM form';
    db.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Database fetch error');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/form/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM form WHERE Id = ?';
    db.query(sql, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Database fetch error');
        } else {
            res.json(results[0]);
        }
    });
});

app.put('/api/form/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const sql = 'UPDATE form SET name = ?, email = ?, age = ? WHERE Id = ?';
    db.query(sql, [name, email, age, id], (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('Database update error');
        } else {
            res.json({ message: 'User updated successfully' });
        }
    });
});

app.delete('/api/form/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM form WHERE Id = ?';
    db.query(sql, [id], (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('Database delete error');
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});