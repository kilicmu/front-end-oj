import Vue from "vue";
import Vuex from "vuex";

import { Store } from "@/store/store";
import { updateUserMsg } from "@/utils/formUtils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLogin: true,
      name: "kilic",
      mail: "kilicmu3389@outlook.com",
      description: "一个老实人",
      from: {
        province: {
          id: "130000000000",
          label: "河北省",
        },
        city: {
          id: "",
          label: "",
        },
        county: {
          id: "",
          label: "",
        },
      },
      headPic:
        "https://tse4-mm.cn.bing.net/th/id/OIP.jxsKwNWUPeYQsAnXRQHDPgHaEG?w=300&h=166&c=7&o=5&pid=1.7",
      blogUrl: "http://google.com",
      tags: [
        { value: "标签1", empty: false },
        { value: "标签2", empty: false },
        { value: "标签3", empty: false },
      ],
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    } as Store.User,
    problemList: {
      content: [],
      currentPage: 1,
      onePageContent: 15,
      max: 0,
      searchVal: "",
    } as Store.ContentList<Store.ProblemItem[]>,
    problemInfo: {
      id: 0,
      title: "A+B Problem",
      difficuly: 1,
      introduce:
        "请计算两个整数的和并输出结果。注意不要有不必要的输出，比如'请输入 a 和 b 的值: '，示例代码见隐藏部分。",
      isPass: true,
      in: "测试输入",
      out: "测试输出",
      demo: [
        { id: 1, in: "1 1", out: "2" },
        { id: 2, in: "1 21", out: "21 " },
      ],
      limitTime: "100s",
      limitMemory: "100M",
      from: "root",
      information: "null",
    } as Store.ProblemInfo,
    userProblemCode: {
      id: 0,
      username: "",
      type: "",
      code: "",
    } as Store.ProblemCode,
    contestList: {
      content: [],
      currentPage: 1,
      onePageContent: 10,
      max: 0,
      searchVal: "",
    } as Store.ContentList<Store.ContestItem[]>,
    contestingState: {
      isContesting: false,
      contestingURL: "",
    } as Store.ContestingState,
    contestAnnouncement: "",
    statusList: {
      content: [],
      currentPage: 1,
      onePageContent: 12,
      max: 0,
      searchVal: "",
    } as Store.ContentList<Store.StatusItem[]>,
  },
  mutations: {
    changeUserMsg(state, res: Store.PostUserMsg) {
      updateUserMsg(state.user, res);
    },
    setToken(state, token: any) {
      localStorage.token = token;
      state.user.token = token;
    },
    delToken(state) {
      state.user.token = "";
      localStorage.removeItem("token");
    },
    setProblemList(state, res: Store.ContentList<Store.ProblemItem[]>) {
      state.problemList.content = res.content;
      state.problemList.currentPage = Number(res.currentPage);
      state.problemList.onePageContent = Number(res.onePageContent);
      state.problemList.max = Number(res.max);
    },
    setProblemListPage(state, pageNo: number) {
      state.problemList.currentPage = pageNo;
    },
    setProblemListSearchValue(state, searchVal: string) {
      state.problemList.searchVal = searchVal;
    },

    setProblemIPfo(state, res: Store.ProblemInfo) {
      state.problemInfo = res;
    },

    setProblemCodeId(state, id: number): void {
      state.userProblemCode.id = id;
    },
    setProblemCode(state, code: string): void {
      state.userProblemCode.code = code;
    },
    setProblemCodeType(state, type: string) {
      state.userProblemCode.type = type;
    },
    setProblemCodeUsername(state, username: string) {
      state.userProblemCode.username = username;
    },
    setContestList(state, res: Store.ContentList<Store.ContestItem[]>) {
      state.contestList.content = res.content;
      state.contestList.currentPage = Number(res.currentPage);
      state.contestList.onePageContent = Number(res.onePageContent);
      state.contestList.max = Number(res.max);
    },

    setContestListSearchValue(state, searchVal: string) {
      state.contestList.searchVal = searchVal;
    },
    setContestingState(state, contestState: Store.ContestingState) {
      state.contestingState.isContesting = contestState.isContesting;
      state.contestingState.contestingURL = contestState.contestingURL;
    },
    setContestAnnouncement(state, Announcement: string) {
      state.contestAnnouncement = Announcement;
    },
    setContestListPage(state, pageNo: number) {
      state.contestList.currentPage = pageNo;
    },
    setStatusList(state, res: Store.ContentList<Store.StatusItem[]>) {
      state.statusList.content = res.content;
      state.statusList.currentPage = Number(res.currentPage);
      state.statusList.onePageContent = Number(res.onePageContent);
      state.statusList.max = Number(res.max);
    },
    setStatusListPage(state, pageNo: number) {
      state.statusList.currentPage = pageNo;
    },
    setStatusListSearchValue(state, searchVal: string) {
      state.statusList.searchVal = searchVal;
    },
  },
  actions: {},
  modules: {},
});
