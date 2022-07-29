export type USER_STATUS = "ONLINE" | "OFFLINE";
export interface UserInfo {
  uId: string;
  uCreateDate: string;
  uEmail: string;
  uName: string;
  uNickName: string;
  uPassword: string;
  uStatus: USER_STATUS;
}
