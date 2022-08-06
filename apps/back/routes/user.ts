import { Request } from "express";
import mongoose from "mongoose";
import { UserInfo } from "opm-models";

// 상태코드 정의
const ALREADY_ID: string = "존재하는 ID 입니다.";

// Mongoose
const userModel = new mongoose.Schema<UserInfo>([] as unknown as UserInfo);
userModel.set("collection", "User");
const User = mongoose.model("User", userModel);

// 중복 이메일 확인
async function checkEmail(email) {
  {
    const targetEmail = await User.find({ uEmail: email });
    console.log("중복 확인 메일: ", targetEmail);
    if (targetEmail.length === 0) {
      return { data: "해당하는 유저가 없습니다. ", result: false };
    } else {
      return { data: "해당하는 유저가 있습니다.", result: true };
    }
  }
}

// const newUser = new User<UserInfo>({
//   uId: "bablabmlakmsldkfm",
//   uCreateDate: "datetime",
//   uEmail: "@",
//   uName: "test",
//   uNickName: "testtest",
//   uPassword: "password",
//   uStatus: "ONLINE",
// });

// newUser.save(function (error, data) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(newUser, "Saved!");
//   }
// });

const showAllUser = async (req, res) => {
  const allUser = await User.find();
  return res.json(allUser);
};

const signUpUser = async (req: Request, res) => {
  console.log("Request email:", req.body);
  // const body = JSON.parse(req.body);
  // var checking = await checkEmail(req.body.uEmail);
  // console.log("User check: ", checking.result);
  return res.send(ALREADY_ID);
};

const user = {
  showAllUser,
  signUpUser,
};

export default user;
