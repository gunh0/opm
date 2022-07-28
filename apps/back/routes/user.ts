import mongoose from "mongoose";
import { UserInfo } from "../../front/types";

const userModel = new mongoose.Schema<UserInfo>([]);

userModel.set("collection", "User");

const User = mongoose.model("User", userModel);

const newUser = new User<UserInfo>({
  uId: "bablabmlakmsldkfm",
  uCreateDate: "datetime",
  uEmail: "@",
  uName: "test",
  uNickName: "testtest",
  uPassword: "password",
  uStatus: "online",
});

newUser.save(function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(newUser, "Saved!");
  }
});

export default {
  async showAllUser (_, res) {
    const allUser = await User.find();
    return res.json(allUser);
  },
};
