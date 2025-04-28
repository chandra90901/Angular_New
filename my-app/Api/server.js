const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};


app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;

    const sql = 'INSERT INTO login (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Database insert error' });
        } else {
            res.json({ message: 'User registered successfully', id: results.insertId });
        }
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [email], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length > 0) {
            const user = results[0];


            if (user.password === password) {

                const token = jwt.sign({ userId: user.id, email: user.email }, 'your_jwt_secret_key', { expiresIn: '1h' });

                res.json({
                    message: 'Login successful',
                    token: token,
                    userId: user.id
                });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});
app.post('/api/form', (req, res) => {
    const { name, email, age, gender, address, phone } = req.body;
    const sql = 'INSERT INTO form (name, email, age,gender ,address,phone) VALUES (?,?,?,?, ?, ?)';
    db.query(sql, [name, email, age, gender, address, phone], (error, results) => {
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
    const { name, email, age, gender, address, phone } = req.body;
    const sql = 'UPDATE form SET name = ?, email = ?, age = ?, gender = ?, address = ?, phone = ? WHERE Id = ?';
    db.query(sql, [name, email, age, gender, address, phone, id], (error) => {
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
