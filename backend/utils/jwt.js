const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/secretkey").secretKey;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  sign: async (user) => {
    const payload = {
      email: user.email,
      id: user.id,
      _id: user._id,
    };
    const result = {
      token: jwt.sign(payload, secretKey, {
        expiresIn: "24h", // 만료시간 60분
        issuer: "토큰발급자",
      }),
    };
    return result;
  },

  verify: async (token) => {
    try {
      return await jwt.verify(token, secretKey);
    } catch (err) {
      console.error(err);
      if (err.message === "jwt expired") {
        console.log("expired token");
        return TOKEN_EXPIRED;
      } else if (err.message === "invalid token") {
        console.log("invalid token");
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("unknown error");
        return TOKEN_INVALID; // 또는 적절한 다른 값을 반환
      }
    }
  },
};
