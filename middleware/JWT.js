const jwt = require("jsonwebtoken");
const JWT_SECRET = "a8e1d29f3e2c4b6c0fd5f90a8c43b18b21f3f9c278e78d5e9993d7f22f69d4eaa4a9e1f0ef4a2923e4c28f1d2a9f0db1c14b7a891e4a6c9ef9d2bde88a6e17cbd";

function JWT(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    jwt.verify(token, JWT_SECRET, (err, client) => {
        if (err) {
            return res.redirect("/login");
        }

        req.client = client;
        next();
    });
}

module.exports = JWT;