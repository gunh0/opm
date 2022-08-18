import mongoose from "mongoose";
import { UserInfo, UserNotificationList } from "opm-models";

const userSchema = new mongoose.Schema<UserInfo>({
  uId: "",
  uCreateDate: "",
  uEmail: "",
  uFirstName: "",
  uLastName: "",
  uNickName: "",
  uPassword: "",
  uStatus: "String",
  uNotiList: [
    {
      seq: "Number",
      checked: "Boolean",
      timestamp: "",
      notiBody: "",
    },
  ],
});
userSchema.set("collection", "User");
const User = mongoose.model<UserInfo>("User", userSchema);

export default User;
