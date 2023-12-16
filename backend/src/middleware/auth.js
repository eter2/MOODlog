const jwt = require("../../utils/jwt");
const MSG = require("../../utils/responseMessage");
const CODE = require("../../utils/statusCode");
const util = require("../../utils/util");

const { secretKey } = require("../../config/secretkey");

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  checkToken: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const user = await jwt.verify(token);
      console.log(user);
      req._id = user._id;
      req.id = user.id;
      req.email = user.email;
      next();
    } catch (err) {
      console.error(err);
      return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
    }
  },
};

module.exports = authUtil;
// 세션 확인 미들웨어
//관리자 권한 확인 미들웨어
/*
exports.isAdmin = async(req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admin only' });
    }
    next();
}

exports.isMember = async(req, res, next) =>  {
    if (!req.session.user || req.session.user.role !== 'member') {
        return res.status(403).json({ message: 'Access denied: Members only' });
    }
    next();
}

exports.isGuest = async(req, res, next) => {
    console.log(req.session);
    if (!req.session.user) {
        return res.status(403).json({ message: 'Access denied: Not allowed for logged-in users' });
    }
    next();
}
// 세션 확인 미들웨어
// function checkSession(req, res, next) {
//     // 사용자가 로그인되어 있지 않은 경우
//     if (!req.session.user) {
//         // 401 Unauthorized 응답을 보내거나, 로그인 페이지로 리디렉션할 수 있습니다.
//         return res.status(401).json({ message: 'Unauthorized: No session found' });
//     }
    
//     // 사용자가 로그인되어 있는 경우, 다음 미들웨어로 이동
//     next();
// }

// module.exports = checkSession;
*/
