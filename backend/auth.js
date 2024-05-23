// backend/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
    {
        id: 1,
        username: 'user1',
        password: bcrypt.hashSync('password1', 8)
    }
];

const secret = '123';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = { authenticateToken, login };
