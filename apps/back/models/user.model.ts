import mongoose from "mongoose";
import { UserInfo } from "opm-models";

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
const User = mongoose.model<UserInfo>("User", userSchema);

export default User;
