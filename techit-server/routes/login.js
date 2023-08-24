const express = require("express")
const router = express.Router();
const joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
});

router.post("/", async (req,res) => {
    try {
     // Joi validation
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error);
    // check if user exists
        let user = await User.findOne({email:req.body.email})
        if (!user) return res.status(400).send("Wrong email or password");
    // check the password - compare
        const result =  await bcrypt.compare(req.body.password, user.password)
        if (!result) return res.status(400).send("Wrong email or password")
    // create token & return a response with token 
        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin, email: user.email }, process.env.jwtKey
        );
        res.status(200).send(token)
    } catch (error) {
        res.status(400).send(error)
    }
});






module.exports = router;