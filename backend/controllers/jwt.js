const jwt = require("jsonwebtoken");

function signToken(user) {
  const token = jwt.sign(
    { user_id: user._id, email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
}

module.exports = {
  signToken,
};
