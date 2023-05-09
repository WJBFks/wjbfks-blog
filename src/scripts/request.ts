/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import qs from "qs";
type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";
interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

function _axios(
  method: Method,
  api: string,
  token: boolean,
  data?: object
): Promise<AxiosResponse> {
  if (token) {
    return axios({
      url: "http://backend.wjbfks.cn/" + api,
      method,
      data: qs.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
  return axios({
    url: "http://backend.wjbfks.cn/" + api,
    method,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
}
console.log(localStorage.getItem("token"));
function _axios2(
  method: Method,
  api: string,
  token: boolean,
  data?: object
): Promise<AxiosResponse> {
  if (token) {
    return axios({
      url: "http://backend.wjbfks.cn/" + api,
      method,
      params: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
  return axios({
    url: "http://backend.wjbfks.cn/" + api,
    method,
    params: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
}

function get(
  api: string,
  token: boolean,
  data?: object
): Promise<AxiosResponse>;
function get(api: string, data: object): Promise<AxiosResponse>;
function get(api: string, b: object | boolean, c?: object) {
  if (typeof b == "boolean") {
    return _axios2("GET", api, b, c);
  }
  if (typeof b == "object") {
    return _axios2("GET", api, false, b);
  }
}

function post(
  api: string,
  token: boolean,
  data?: object
): Promise<AxiosResponse>;
function post(api: string, data: object): Promise<AxiosResponse>;
function post(api: string, b: object | boolean, c?: object) {
  if (typeof b == "boolean") {
    return _axios("POST", api, b, c);
  }
  if (typeof b == "object") {
    return _axios("POST", api, false, b);
  }
}

function put(
  api: string,
  token: boolean,
  data?: object
): Promise<AxiosResponse>;
function put(api: string, data: object): Promise<AxiosResponse>;
function put(api: string, b: object | boolean, c?: object) {
  if (typeof b == "boolean") {
    return _axios("PUT", api, b, c);
  }
  if (typeof b == "object") {
    return _axios("PUT", api, false, b);
  }
}

function del(
  api: string,
  token: boolean,
  data?: object
): Promise<AxiosResponse>;
function del(api: string, data: object): Promise<AxiosResponse>;
function del(api: string, b: object | boolean, c?: object) {
  if (typeof b == "boolean") {
    return _axios2("DELETE", api, b, c);
  }
  if (typeof b == "object") {
    return _axios2("DELETE", api, false, b);
  }
}

export default {
  get,
  post,
  put,
  del,
};
