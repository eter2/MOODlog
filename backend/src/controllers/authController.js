const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const token = await authService.register(req.body);
    return res.status(201).send(token);
  } catch (error) {
    console.log(error.statusCode);
    return res.status(error.statusCode || 400).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password) {
      return res
        .status(400)
        .json({ message: "Login ID and password are required." });
    }

    const token = await authService.login(id, password);

    res.status(200).send(token);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

exports.logout = (req, res) => {
  if (req.session.user) {
    // 세션 삭제
    req.session.destroy((err) => {
      if (err) {
        // 세션 삭제 중 오류 발생
        return res.status(500).send({ message: "Logout error" });
      }
      // 세션 삭제 성공
      res.clearCookie("connect.sid"); // 세션 쿠키 삭제 (세션 쿠키 이름은 설정에 따라 다를 수 있음)
      res.status(200).send({ message: "Successfully logged out" });
    });
  } else {
    // 이미 로그아웃 상태
    res.status(200).send({ message: "Already logged out" });
  }
};



exports.sendEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;

    const user = await authService.emailAuth(userEmail);
    res.send(user);
  } catch (error) {
    if (error.message === "No user found with this verification token.") {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("An error occurred during the process.");
    }
  }
};

exports.checkIdDuplicate = async (req, res) => {
  const { id } = req.body;
  try {
    const isExist = await authService.checkIdDuplicate(id);

    if (!isExist) {
      res.json({ success: true, message: "사용가능한 ID 입니다." });
    } else {
      res.json({ success: false, message: "중복된 ID가 이미 존재합니다." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
};

exports.userVerify = async (req, res) => {
  const { userId } = req.params.userId;
  if (userId !== req.id) {
    return res
      .status(403)
      .json({ error: "You do not have permission to update this comment" });
  } else return res.status(200).json({ message: "Success" });
};

exports.emailVerify = async (req, res) => {
  const { email, authNumber } = req.body;

  try {
    const isMatch = await authService.checkAuthNumber(email, authNumber);

    if (isMatch) {
      res.json({ success: true, message: "인증에 성공하였습니다." });
    } else {
      res.json({ success: false, message: "인증번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
};

exports.checkEmailDuplicate = async (req, res) => {
  const { email } = req.body;
  try {
    const isExist = await authService.checkEmailDuplicate(email);

    if (!isExist) {
      res.json({ success: true, message: "사용가능한 Email 입니다." });
    } else {
      res.json({ success: false, message: "중복된 Email이 이미 존재합니다." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
};
