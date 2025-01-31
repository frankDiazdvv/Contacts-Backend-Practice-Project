const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@desc Register a User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    } 

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created: ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data not valid!");
    }

    console.log("Hashed Password: ", hashedPassword);

    res.json({ message: "Register the user" });
});

//@desc Login a User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 
    if(!email || !password){
        res.status(400);
        throw new Error("Please enter email AND password! All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare passwprd wirh hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" } 
    );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password incorrect!")
    }
});

//@desc Current User Information
//@route GET /api/users/current
//@access private
const currentUserInfo = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUserInfo };