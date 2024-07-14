const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { username , password } = req.body;
    if(!username || !password){
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    else{
        const user = await User.findOne({username : username});
        if(user){
            res.status(400);
            throw new Error("User already exists");
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            // console.log(hashedPassword);

            const user = new User({
                username : username,
                password : hashedPassword
            });

            user.save();
            res.json({message : "User registered"});
        }
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username , password } = req.body;
    if(!username || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    else{
        const user = await User.findOne({ username : username });
        if(user && await bcrypt.compare(password, user.password)){
            const accessToken = jwt.sign({
                    user : {
                        username : user.username,
                        id : user.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn : "50m" }
            );
            res.json({accessToken : accessToken});
        }
        else{
            res.status(404);
            throw new Error("User not found");
        }
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };