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

module.exports = User;