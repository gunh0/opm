import { Request } from "express";
import { Schema, model } from "mongoose";
import { UserInfo } from "opm-models";
// const MUUID = require('uuid-mongodb');

// 상태코드 정의
const ALREADY_ID: string = "존재하는 ID 입니다";
const CREATED_ID: string = "회원가입 완료";

const statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  DB_ERROR: 600,
};

// Mongoose
const userSchema = new Schema<UserInfo>({
  uId: "String",
  uCreateDate: "String",
  uEmail: "String",
  uFirstName: "String",
  uLastName: "String",
  uNickName: "String",
  uPassword: "String",
  uStatus: "String",
});
userSchema.set("collection", "User");
const User = model<UserInfo>("User", userSchema);

const showAllUser = async (req, res) => {
  const allUser = await User.find();
  return res.json(allUser);
};

const signUpUser = async (req: Request, res) => {
  console.log("Requests:", req.body);
  console.log("Request email:", req.body.uEmail);
  const newUser = new User({
    uEmail: req.body.uEmail,
    uPassword: req.body.uPassword,
    uFirstName: req.body.uFirstName,
    uLastName: req.body.uLastName,
  });
  // 중복 이메일 확인
  const checkUser = await User.find({ uEmail: req.body.uEmail });
  console.log(checkUser.length);
  if (checkUser.length) {
    console.log("이미 존재하는 사용자입니다.");
    return res.send(ALREADY_ID);
  } else {
    console.log("존재하지 않는 사용자입니다.");
    console.log("회원등록 정보:", newUser);
    await newUser.save();
    return res.send(CREATED_ID);
  }
};

const signIn = async (req: Request, res) => {
  const checkUser = await User.find({ uEmail: req.body.uEmail });
  console.log(checkUser.length);
  if (checkUser.length) {
    const user = await User.find({
      uEmail: req.body.uEmail,
      uPassword: req.body.uPassword,
    });

    // 비밀번호 확인
    console.log(user.length);
    if (user.length === 0) {
      return res.status(statusCode.BAD_REQUEST).send("잘못된 비밀번호입니다.");
    } else {
      return res.status(statusCode.OK).send("로그인 성공!");
    }
  } else {
    return res.status(statusCode.BAD_REQUEST).send("없는 사용자입니다.");
  }
};

const user = {
  showAllUser,
  signUpUser,
  signIn,
};

export default user;
