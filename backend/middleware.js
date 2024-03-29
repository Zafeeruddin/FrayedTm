const jwt = require("jsonwebtoken");
const secretKey = require("./config");
console.log(secretKey)
const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization;

    // Remove "Bearer " prefix from token string
    if (token && token.startsWith("Bearer ")) {
        token = token.replace("Bearer ", "");

    }
    try {
        console.log(token +" is token")
        const decodedToken = jwt.verify(token, secretKey); // Verify the JWT token
        console.log(token + "this is user id \n" + req.userId)
        console.log(JSON.stringify(decodedToken, null, 2));
        // Extract user ID from the decoded token and attach it to the request object
        req.userId = decodedToken.userID;

        next(); // Call the next middleware or route handler
    } catch (error) {
        res.status(403).json({ error: "Forbidden", message: "Invalid token" });
    }
};

module.exports = authMiddleware;
