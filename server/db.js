const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/UserProfile');
    console.log('Database Successfully connected')
}
main().catch(err => console.log(err));

// Create the User schema
const userSchema = mongoose.Schema({
    name : String,
    phone : Number,
    email : String,
    password : String
})

// Create the User model or collection
const User = mongoose.model( 'User',userSchema );

// Create the User schema
const otpSchema = mongoose.Schema({
    email: String,
    otp: Number,
    createdAt: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
      }
},
{
    versionKey: false, // Disable the __v field
});

// Create the User model or collection
const Otp = mongoose.model( 'Otp',otpSchema );

module.exports = {User, Otp };