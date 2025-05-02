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
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Insert failed' });
        }
        res.json({ id: result.insertId, username, email });
    });
});

app.get('/api/signup', (req, res) => {
    const sql = 'SELECT id, username, email, password FROM login';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching users' });
        } else {
            res.json(results);
        }
    });
});
app.get('/api/signup/email/:email', (req, res) => {
    const email = req.params.email;
    const sql = 'SELECT id, username, email FROM login WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(results[0]);
    });
});

app.put('/api/signup/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const sql = 'UPDATE login SET username = ?, email = ?, password = ? WHERE id = ?';
    db.query(sql, [username, email, password, id], (error) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Database update error' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
    });
});

// Delete user
app.delete('/api/signup/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM login WHERE id = ?';
    db.query(sql, [id], (error) => {
        if (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
});





app.post('/api/login', (req, res) => {
    const { identifier, password } = req.body;

    const sql = 'SELECT * FROM login WHERE email = ? OR username = ?';

    db.query(sql, [identifier, identifier], (error, results) => {
        if (error) {
            console.error('DB error:', error);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        if (user.password === password) {
            const token = jwt.sign(
                { userId: user.id, username: user.username, email: user.email },
                'your_jwt_secret_key',
                { expiresIn: '1h' }
            );

            return res.json({
                message: 'Login successful',
                token,
                userId: user.id
            });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    });
});

app.post('/api/form', async (req, res) => {
    try {
        const { name, email, age, gender, address, phone } = req.body;

        if (!name || !email) {
            return res.status(400).send('Name and email are required');
        }

        const sql = 'INSERT INTO form (name, email, age, gender, address, phone) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await new Promise((resolve, reject) => {
            db.query(sql, [name, email, age, gender, address, phone], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        res.json({ message: 'User added successfully', id: results.insertId });

    } catch (error) {
        // console.error('Error in /api/form:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).send('Email already exists');
        } else {
            res.status(500).send('Internal server error');
        }
    }
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
