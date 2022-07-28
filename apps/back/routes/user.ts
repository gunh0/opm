import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  u_id: "string",
  u_createDate: "string",
  u_email: "string",
  u_name: "string",
  u_nickName: "string",
  u_password: "string",
  u_status: "string",
});

userModel.set("collection", "User");

const User = mongoose.model("User", userModel);

const newUser = new User({
  u_id: "string",
  u_createDate: "string",
  u_email: "string",
  u_name: "test",
  u_nickName: "string",
  u_password: "string",
  u_status: "string",
});

newUser.save(function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(newUser, "Saved!");
  }
});

export const showAllUser = async (_, res) => {
  const allUser = await User.find();
  return res.json(allUser);
};
