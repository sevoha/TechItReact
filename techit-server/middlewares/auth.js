const jwt = require("jsonwebtoken")

module.exports = (req,res,next) => {
    try {
    
    // Token from req
        const token = req.header("Authorization")
        if(!token) return res.status(401).send("Access denied. No valid token ")
    // Check the token
        const payload = jwt.verify(token, process.env.jwtKey)
    // Save the payLoad 
        req.payload = payload;
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}

