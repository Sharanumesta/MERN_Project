const { User, Otp } = require('./db');
const transport = require('./mail');
const passportConfig = require('./passportConfig');
const generateOTP =  require('./genarteOTP');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
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
server.post('/registration', async (req, res) => {
  
  const data = req.body;
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }else{

        const otp = generateOTP();
        const mailData = {
          from: 'sharanumesta1201@gmamil.com',
          to: email,
          subject: "Verify your Email",
          text: `Your email verification code is ${otp} please do not share with others`
        };
    
        transport.sendMail(mailData, async (error) => {
          if (error) {
            return res.status(500).json({ error: "Error sending email" });
          } else {

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(data.password, salt);
            
            let user = new User();
        
            user.name = data.name;
            user.phone = data.phone;
            user.email = data.email;
            user.password = hashPass;
        
            await user.save();
            // console.log('User saved to the Database');
            // res.status(200).json({ message: 'Successfully Values Stored in Database' });

            const storeOtp = new Otp({
              name : 'Email verification',
              email: email,
              otp: otp,
            });
    
            await storeOtp.save();
            return res.json({ message: "OTP sent successfully" });
          }
        });
    }}
    catch (error) {
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
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decode = jwt.verify(token, 'mestashara');
    const email = decode.email
    const query = { name:1, phone:1, email:1, _id:0 }
    const user = await User.findOne({ email }, query);
    return res.json({ user });
  } catch (error) {
    console.error('JWT decoding error:', error);
  }
});

server.post('/mail',async (req, res) => {
  const data = req.body;
  try {
    const mailData = {
      from: 'sharanumesta1201@gmamil.com',
      to: data.to,
      subject: data.subject,
      text: data.text
    };

    transport.sendMail(mailData,(error) => {
      if(error){
        return res.status(500).json({ error: 'Error sending email' });
      } else {
        return res.json({ message: 'Email sent successfully' });
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

});

server.post('/forgot_password', async (req, res) => {
  

  const email = req.body.email;
  const user = await User.findOne({email});
  
  if(user){
    const otp = generateOTP();
    const mailData = {
      from: 'sharanumesta1201@gmamil.com',
      to: email,
      subject: "Reset your password",
      text: `Your one time password is ${otp} please do not share with others`
    };

    transport.sendMail(mailData, async (error) => {
      // if (error) {
      //   return res.status(500).json({ error: "Error sending email" });
      // } 
      // else {/
        const storeOtp = new Otp({
          email: email,
          otp: otp,
        });
        await storeOtp.save();
        return res.json({ message: "OTP sent successfully" });
      // }
    });
  }else{
    return res.json({ message: 'User not found' });
  }
})

server.post('/validat_otp', async (req, res) => {
  try {
    const data = req.body;
    const email = data.email.email || data.email;
    const otp = data.otp;

    const query = {_id:0, otp:1, name:1}
    const dbOtp = await Otp.findOne({email : email},query).sort({ createdAt: -1 });
    const otpName = dbOtp.name;

    if (otp === dbOtp.otp) {
      return res.json({ message: 'Otp successfully validated', otpName});
    } else {
      return res.json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.log(error)
  }
});

server.post('/update_password', async (req, res) => {
  try {
    const email = req.body.email;
    const newPassword = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const updatePassword = await User.updateOne(
      { email: email }, 
      { $set: { password: hashPassword }}
    );

    if(updatePassword){
      return res.json({ message: 'Password updated successfully'})
    }
  } catch (error) {
    console.log(error);
  }
});

server.get('/', (req, res) => {
  res.send('Server is running');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});