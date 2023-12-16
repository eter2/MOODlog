var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const nunjucks = require("nunjucks");
const session = require("express-session");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose").default;
const authUtil = require("./src/middleware/auth");
const MongoStore = require("connect-mongo");

// 라우터 선언
var app = express();
var usersRouter = require("./routers/users");
var authRouter = require("./routers/auth");
var postRouter = require("./routers/post");
var friendRouter = require("./routers/friend");
var commentRouter = require("./routers/comment");
var likeRouter = require("./routers/like");
var guestbookRouter = require("./routers/guestbook");
var emotionRouter = require("./routers/emotion");
var weatherRouter = require("./routers/weather");
var profileRouter = require("./routers/profile");

//미들웨어 세팅
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// //쿠키 설정
// app.use(cookieParser("PUnebiTc7K"));

// //세션 설정
// app.use(
//   session({
//     secret: "PUnebiTc7K", // 세션 암호화 키
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//     store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/moodlog" }),
//   })
// );

//Cors 설정
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

//DB 연결
mongoose.connect("mongodb://127.0.0.1:27017/moodlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  console.log("Connection to mongoDB");
});

//라우터 연결
app.use(authRouter);
app.use(authUtil.checkToken);
app.use(usersRouter);
app.use(postRouter);
app.use(guestbookRouter);
app.use(postRouter);
app.use(friendRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(emotionRouter);
app.use(weatherRouter);
app.use(profileRouter);

// 서버 실행 코드
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
