const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;
const expiresIn = process.env.expiresIn;

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Mauvaise syntaxe de jeton JWT" });
    }

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Accès refusé" });
    }
    jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Jetons JWT non valides" });
    }
  }
};

module.exports = isAuthenticated;
