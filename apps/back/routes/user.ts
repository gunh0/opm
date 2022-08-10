import { Request } from "express";
import { Schema, model, connect } from "mongoose";
import { UserInfo } from "opm-models";

// 상태코드 정의
const ALREADY_ID: string = "존재하는 ID 입니다.";

// interface UserInfo {
//   uId: string;
//   uCreateDate: string;
//   uEmail: string;
//   uFirstName: string;
//   uLastName: string;
//   uNickName: string;
//   uPassword: string;
// }

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

// 중복 이메일 확인
async function checkEmail(email) {
  {
    console.log("checkEmail Func.", email);
    const targetEmail = await User.find({ uEmail: email });
    console.log("중복 확인 메일: ", targetEmail);
    if (targetEmail.length === 0) {
      return { data: "해당하는 유저가 없습니다. ", result: false };
    } else {
      return { data: "해당하는 유저가 있습니다.", result: true };
    }
  }
}

const showAllUser = async (req, res) => {
  const allUser = await User.find();
  return res.json(allUser);
};

const signUpUser = async (req: Request, res) => {
  console.log("Requests:", req.body);
  console.log("Request email:", req.body.uEmail);
  // const body = JSON.parse(req.body);
  // var checking = await checkEmail(req.body.uEmail);
  // console.log("User check: ", checking.result);
  const newUser = new User({
    uEmail: req.body.uEmail,
    uPassword: req.body.uPassword,
  });
  const checkUser = await User.find({ uEmail: req.body.uEmail });
  console.log(checkUser.length);
  if (checkUser.length) {
    console.log("하위");
  } else {
    console.log("바위");
  }
  await newUser.save({});
  console.log(newUser);

  return res.send(ALREADY_ID);
};

const user = {
  showAllUser,
  signUpUser,
};

export default user;
