import { Request } from "express";
import { Schema, model } from "mongoose";
import { UserInfo } from "opm-models";
// const MUUID = require('uuid-mongodb');

// 상태코드 정의
const ALREADY_ID: string = "존재하는 ID 입니다";
const CREATED_ID: string = "회원가입 완료";

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

const user = {
  showAllUser,
  signUpUser,
};

export default user;
