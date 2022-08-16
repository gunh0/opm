import { randomUUID } from "crypto";

import { Request } from "express";
import mongoose, { Schema, model } from "mongoose";
import { UserInfo, StatusCode } from "opm-models";

// 상태코드 정의
const ALREADY_ID: string = "존재하는 ID 입니다";
const CREATED_ID: string = "회원가입 완료";

// Mongoose
const userSchema = new mongoose.Schema<UserInfo>({
  uId: "",
  uCreateDate: "",
  uEmail: "",
  uFirstName: "",
  uLastName: "",
  uNickName: "",
  uPassword: "",
  uStatus: "String",
});
userSchema.set("collection", "User");
const User = model<UserInfo>("User", userSchema);

const showAllUser = async (req, res) => {
  const allUser = await User.find();
  return res.json(allUser);
};

const signUpUser = async (req: Request, res) => {
  console.info("Requests:", req.body);

  const { email, password, firstName, lastName } = req.body;
  const newUser = new User({
    uId: randomUUID(),
    uEmail: email,
    uPassword: password,
    uFirstName: firstName,
    uLastName: lastName,
  });
  // 중복 이메일 확인
  const checkUser = await User.find({ uEmail: email });
  if (checkUser.length) {
    console.info("이미 존재하는 사용자입니다.");
    return res.send(ALREADY_ID);
  } else {
    console.info("존재하지 않는 사용자입니다.");
    console.info("회원등록 정보:", newUser);
    await newUser.save();
    return res.send(CREATED_ID);
  }
};

const signIn = async (req: Request, res) => {
  const user = await User.findOne({
    uEmail: req.body.email,
    uPassword: req.body.password,
  });

  if (!user) {
    return res.status(StatusCode.BAD_REQUEST).send("잘못된 인풋입니다.");
  }
  return res.status(StatusCode.OK).json(user);
};

// const updateNotiList = async();

const user = {
  showAllUser,
  signUpUser,
  signIn,
};

export default user;
