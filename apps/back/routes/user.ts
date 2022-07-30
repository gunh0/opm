import mongoose from "mongoose";
import { UserInfo } from "opm-models";

const userModel = new mongoose.Schema<UserInfo>([] as unknown as UserInfo);

userModel.set("collection", "User");

const User = mongoose.model("User", userModel);

const newUser = new User<UserInfo>({
  uId: "bablabmlakmsldkfm",
  uCreateDate: "datetime",
  uEmail: "@",
  uName: "test",
  uNickName: "testtest",
  uPassword: "password",
  uStatus: "ONLINE",
});

newUser.save(function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(newUser, "Saved!");
  }
});

const showAllUser = async (_, res) => {
  const allUser = await User.find();
  return res.json(allUser);
};

const user = {
  showAllUser,
};

export default user;
