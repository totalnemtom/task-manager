const jwt = require("jsonwebtoken");

const signToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );
};
module.exports = { signToken };
