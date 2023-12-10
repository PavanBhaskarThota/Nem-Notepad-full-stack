const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "DC", (err, decoded) => {
      if (decoded) {
        req.body.userId = decoded.userid;
        req.body.username = decoded.username;
        //console.log(decoded);
        next();
      } else {
        res.send("You are not authorised");
      }
    });
  } else {
    res.send("You are not authorised");
  }
};

module.exports = {
  authmiddleware,
};
