const db = require('../config/userDb'); // Import the db connection

// Fetch all stocks from the database

function generateUserId(index) {
    return `U${index}`;
}

const getUsers = (req, res) => {
    db.fetchAllRecords((err, rows) => {
        if (err) {
            console.error('Error fetching stocks:', err);
            return res.status(500).json({ message: 'Error fetching stocks', error: err.message });
        }
        res.json(rows); // Send the stock data as a JSON response
    });
};

const registerUsers = (req, res) => {
    const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);  // Hash the password

  const query = `INSERT INTO users_details (id, username, password) VALUES (?, ?)`;
  db.run(query, [generateUserId(Math.floor(Math.random() * 100) + 1),username, hashedPassword], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error registering user', error: err.message });
    }

    const token = jwt.sign({ id: this.lastID, username }, config.jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  });
};

const loginUsers = (req, res) => {
    const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = `SELECT * FROM users_details WHERE username = ?`;
  db.get(query, [username], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user', error: err.message });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the hashed password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  });
};

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Bearer <token>
    if (!token) {
      return res.status(403).json({ message: 'Token required' });
    }
  
    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = user;
      next();
    });
  };

module.exports = {      
    getUsers,
    registerUsers,
    loginUsers
}
