// Require the Express module and create a router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
// Require the User model
const User = require("../models/User");

// Set a secret key for JWT signing
const JWT_SECRET = "hehe343%%324^2";

// Require the Express-validator middleware to validate request body parameters
const { body, validationResult } = require('express-validator');

//create user route
router.post('/createuser', [
    // Validate email, name, and password fields using Express-validator
    body('email', 'invalid email').isEmail(),
    body('name', 'invalid name').isLength({ min: 3 }),
    body('password', 'invalid password').isLength({ min: 5 }),
], async (req, res) => {
    // Check for validation errors and return them if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let success=false;
        // Check if user with given email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "this email already exists" });
        }

        // If there are no validation errors and the user doesn't already exist,
        // hash the password and create a new user with the given email, name, and password
        const salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        // Sign a JWT token containing the user ID
        const data = {
            user: {
                id: user.id
            }
        };
        const jwtToken = jwt.sign(data, JWT_SECRET);
        // Log the JWT token to the console (for debugging purposes)
        // console.log(jwtToken);

        // Send a success response with the user object and JWT token
        success=true;
        res.json({
            success,
            jwtToken
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occurred");
    }
});

//user login route
router.post('/login', [
    // Validate email, and password fields using Express-validator
    body('email', 'invalid email').isEmail(),
    body('password', 'invalid password').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    try {
        let success=false;
        const user =await User.findOne({email});
        if(!user){ 
            return res.status(400).json({success,error:"invalid cred"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({success,error:"invalid cred"})
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const jwtToken = jwt.sign(data, JWT_SECRET);
        
        // Log the JWT token to the console (for debugging purposes)
        console.log(jwtToken);
        success=true;
        res.json({success,jwtToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occurred");
    }
})

//user details route
router.post('/getuser',fetchuser,async (req, res) => {
    try {
        userId=req.user.id
        const user=await User.findById(userId).select("-password")
        if(!user){res.json('user does not exist')}
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json('some error occured')
    }
}) 
// Export the router for use in other parts of the application
module.exports = router;  