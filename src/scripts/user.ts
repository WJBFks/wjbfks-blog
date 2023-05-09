/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ElMessage } from "element-plus";
import qs from "qs";
import { reactive } from "vue";
import request from "./request";

/* eslint-disable prefer-const */
export interface IUserData {
  avatar: string;
  created: string;
  email: string;
  gender: number;
  last: number;
  name: string;
  tel: string;
  _id: string;
}
let isLogin: boolean | null = null;
let logout = () => {
  User.token = null;
  User.isLogin = false;
  ElMessage({
    showClose: true,
    message: "登出成功",
    type: "error",
  });
};
const User = reactive({
  data: null!,
  token: null,
  isLogin,
  logout,
} as {
  data: IUserData;
  token: string | null;
  isLogin: boolean | null;
  logout: () => void;
});
Object.defineProperty(User, "token", {
  get() {
    return localStorage.getItem("token");
  },
  set(t: string | null) {
    if (t == null) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", t);
    }
  },
});
Object.defineProperty(User, "data", {
  get() {
    let str = localStorage.getItem("userData");
    if (str == null) {
      return null;
    }
    return qs.parse(str) as unknown as IUserData;
  },
  set(obj: IUserData) {
    localStorage.setItem("userData", qs.stringify(obj));
  },
});
request.get("users/token", true).then(
  (res) => {
    User.data = res.data.user;
    User.isLogin = true;
    ElMessage({
      showClose: true,
      message: "登录成功",
      type: "success",
    });
  },
  () => {
    User.isLogin = false;
  }
);
export default User;
