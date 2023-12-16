const hashUtil = require("../../utils/hashUtil");
const jwt = require("../../utils/jwt");
const smtpTransport = require("../../utils/email");
const statusCode = require("../../utils/statusCode");
const util = require("../../utils/util");
const responseMsg = require("../../utils/responseMessage");
const User = require("../models/User");
const Profile = require("../models/Profile");

const Auth = require("../models/AuthNumber");

exports.register = async ({ username, email, id, password }) => {

  const existingUserByEmail = await User.findOne({ email });
  const existingUserById = await User.findOne({ id });
  const existingUserByUsername = await User.findOne({ username });

  if (existingUserByEmail || existingUserById || existingUserByUsername) {
    throw {
      statusCode: 409,
      message: "Email, ID, or Username already exists",
    };
  }

  const hashedPassword = await hashUtil.hashPassword(password);
  const user = new User({
    email,
    id,
    password: hashedPassword,
  });
  const savedUser = await user.save();

  const profile = new Profile({
    id: id,
    blog_name: id,
    username,
    image: "",
    about: "",
  });
  await profile.save();

  const jwtToken = await jwt.sign(user);

  return jwtToken;
};

exports.login = async (id, password) => {
  const user = await User.findOne({ id });
  if (!user) {
    throw new Error("User not exists");
  }

  const isValid = await hashUtil.comparePassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }

  console.log("Success!");
  const jwtToken = await jwt.sign(user);

  return jwtToken;
};


var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.emailAuth = async (email) => {
  const authNumber = generateRandomNumber(111111, 999999);
  console.log(authNumber);

  try {
    await Auth.deleteOne({ email });
    const auth = new Auth({ email, authNumber });
    await auth.save();

    const mailOptions = {
      from: "kyungheeyj45@naver.com",
      to: email,
      subject: "인증 관련 메일입니다.",
      html: `<h1>인증번호를 입력해주세요</h1><p>${authNumber}</p>`,
    };

    await smtpTransport.transPort.sendMail(mailOptions);
    return {
      ok: true,
      msg: "메일 전송에 성공하였습니다.",
      authNum: authNumber,
    };
  } catch (error) {
    console.error(error);
    throw new Error("메일 전송 또는 MongoDB 작업에 실패하였습니다.");
  }
};

exports.checkIdDuplicate = async (id) => {
  try {
    const finduser = await User.findOne({ id: id });
    if (finduser) {
      return true;
    } else return false;
  } catch (err) {
    console.error("MongoDB error: ", err);
    throw err;
  }
};

exports.checkAuthNumber = async (email, authNumber) => {
  try {
    const storedAuthNumber = await Auth.findOne({ email });
    return storedAuthNumber.authNumber === Number(authNumber);
  } catch (err) {
    console.error("MongoDB error: ", err);
    throw err;
  }
};

exports.checkEmailDuplicate = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user ? true : false;
  } catch (error) {
    throw error;
  }
};
