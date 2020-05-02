import axios from "axios";
import { Store } from "@/store/store";

const BASE_RUL = "http://127.0.0.1:3000/api/";

const URIS = {
  login: "login",
  getProblems: "getProblems",
  searchProblemsByString: "searchProblemsByString",
  submitProblemCode: "submitProblemCode",
  getProblemInfo: "getProblemInfo",
  contestList: "contestList",
  contestingState: "contestingState",
  searchContestListByString: "searchContestListByString",
  contestAnnouncement: "contestAnnouncement",
  getStatusList: "getStatusList",
  getStutusListByUser: "getStutusListByUser",
  getStatusListByString: "getStatusListByString",
  getRegionJson: "getRegionJson",
  postUserMsg: "postUserMsg",
  uploadHeadPic: "uploadHeadPic",
};

type HttpMethods = "GET" | "POST";

interface RequestParams {
  url: string;
  method?: HttpMethods;
  data?: object;
  timeout?: number;
}

function asyncRequest(params: RequestParams) {
  const url = params.url.startsWith("http")
    ? params.url
    : BASE_RUL + params.url;
  const method = params.data ? "POST" : "GET";
  const data = method === "POST" ? (params.data ? params.data : {}) : null;
  const config = {};
  config["method"] = method;
  data ? (config["data"] = data) : null;
  config["url"] = url;
  config["timeout"] = 10000;
  return new Promise((resolve, reject) => {
    axios(config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

interface LoginForm {
  username: string;
  password: string;
}

async function login(loginForm: LoginForm) {
  const url = URIS.login;
  console.log(loginForm);
  return asyncRequest({ url, data: loginForm });
}

type ListType = "ProblemList" | "ContestList" | "StatusList";

async function asyncRequireList(
  listType: ListType,
  oneContent: number,
  current = 1,
  searchVal = "",
  onlySelf = false
) {
  let url =
    "get" +
    listType +
    `?current=${current}&oneContent=${oneContent}${
      searchVal !== "" ? `&searchVal=${searchVal}` : ""
    }&onlySelf=${onlySelf}`;
  url = url.replace("+", "%2B");
  return await asyncRequest({ url });
}

/**
 * 根据指定字符串搜索Problems条目
 * @param str 搜索依据字符串
 */
async function searchProblemsByString(
  searchString: string,
  current = 1,
  oneContent = 15
) {
  const url =
    URIS.searchProblemsByString +
    `?current=${current}&oneContent=${oneContent}`;
  return await asyncRequest({
    url,
    data: {
      searchString,
    },
  });
}

/**
 * 获取指定Problems页面目标页码数据
 * @param step 请求页数步长（缓存）
 * @param current 当前页面码
 * @param oneContent 一页数据条数
 */
async function getProblems(searchVal = "", current = 1, oneContent = 15) {
  const url =
    URIS.getProblems +
    `?current=${current}&oneContent=${oneContent}${
      searchVal !== "" ? `&searchVal=${searchVal}` : ""
    }`;
  return await asyncRequest({ url });
}

async function getProblemInfo(pid: number) {
  const url = URIS.getProblemInfo + `?pid=${pid}`;
  return await asyncRequest({ url });
}

async function submitProblem(problemData: Store.ProblemCode) {
  const url = URIS.submitProblemCode;
  return await asyncRequest({ url, data: problemData });
}

async function getContestList(current = 1, oneContent = 10) {
  const url = URIS.contestList + `?current=${current}&oneContent=${oneContent}`;
  return await asyncRequest({ url });
}

async function getContestingState() {
  const url = URIS.contestingState;
  return await asyncRequest({ url });
}

async function getContestAnnouncement() {
  const url = URIS.contestAnnouncement;
  return await asyncRequest({ url });
}

async function getRegionJson() {
  const url = URIS.getRegionJson;
  return await asyncRequest({ url });
}

/**
 * 提交修改数据，更新后返回相同格式JSON数据
 * @param data
 */
async function postUserMsg(data: Store.PostUserMsg) {
  const url = URIS.postUserMsg;
  return await asyncRequest({ url, data });
}

async function uploadHeadPic(file: any) {
  const url = URIS.uploadHeadPic;
  const data = {
    file,
  };
  return await asyncRequest({ url, data });
}
export default {
  login,
  getProblems,
  asyncRequireList,
  getProblemInfo,
  searchProblemsByString,
  submitProblem,
  getContestList,
  getContestingState,
  getContestAnnouncement,
  getRegionJson,
  postUserMsg,
  uploadHeadPic,
};
