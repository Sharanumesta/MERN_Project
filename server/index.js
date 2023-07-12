const User = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportConfig = require('./passportConfig');
const flash = require('express-flash');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');

const port = 8080;
const server = express();
server.use(cors());
server.use(cors({
    origin: 'http://localhost:3000',
}));  
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(flash());

// Set up session middleware 
server.use(expressSession({ secret: 'Secret', resave: false, saveUninitialized: false }));

// Initialize Passport and session middleware
server.use(passport.initialize());
server.use(passport.session());

// Configure Passport
passportConfig(passport); 

// CRUD - Create
server.post('/', async (req, res) => {
  
  try {
    const data = req.body;
    const email = data.email;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(data.password, salt);
    
    let user = new User();

    user.name = data.name;
    user.phone = data.phone;
    user.email = data.email;
    user.password = hashPass;

    await user.save();
    console.log('User saved to the Database');
    res.status(200).json({ message: 'Successfully Values Stored in Database' });
    } catch (error) {
      console.error('Error storing User', error);
      res.status(500).json({ error: 'An Error occurred' });
    }
});

// Login route
server.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      // Handle any errors that occur during authentication
      return next(err);
    }

    if (!user) {
      // Return an error response to the client
      return res.json({ message: 'Invalid email or password' });
    }

    // If authentication is successful, manually log in the user
    req.login(user, (err) => {
      // Generate JWT
      const token = jwt.sign({ email: user.email }, 'mestashara');
      // Successful authentication, send response with JWT
      return res.json({ message: 'Login successful', token });
    });
  })(req, res, next);
});

server.get('/profile', async (req, res) => {
  const token = req.body.headers['Authorization'];
  try {
    const decode = jwt.verify(token, 'mestashara');
    const email = decode.email
    const user = await User.findOne({ email: email });

    return res.json({ user });
  } catch (error) {
    
  }
});


server.get('/', (req, res) => {
  res.send('Server is running');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});