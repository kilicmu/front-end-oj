const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

router.post("/login", (ctx) => {
  console.log(ctx.request);
});

router.get("/api/getProblemList", async (ctx) => {
  // ctx.query
  let data = require("../jsonData/problemsTest.json");
  let query = ctx.query;
  let searchVal = query.searchVal;
  let content = null;
  if (searchVal) {
    content = data.content.filter((val) => {
      console.log(val);
      return val.title.includes(searchVal);
    });
  } else {
    content = data.content;
  }
  let max = content.length;
  let currentPage = query.current;
  let onePageContent = query.oneContent;
  if (query.current * query.oneContent > content.length) {
    content = content.slice((query.current - 1) * query.oneContent);
  } else {
    content = content.slice(
      (query.current - 1) * query.oneContent,
      query.current * query.oneContent
    );
  }
  ctx.body = {
    content,
    max,
    currentPage,
    onePageContent,
  };
});

router.get("/api/getContestList", async (ctx) => {
  // ctx.query
  let data = require("../jsonData/contestListTest.json");
  let query = ctx.query;
  let searchVal = query.searchVal;
  let content = null;
  if (searchVal) {
    content = data.content.filter((val) => {
      console.log(val);
      return val.contestName.includes(searchVal);
    });
  } else {
    content = data.content;
  }
  let max = content.length;
  let currentPage = query.current;
  let onePageContent = query.oneContent;
  if (query.current * query.oneContent > content.length) {
    content = content.slice((query.current - 1) * query.oneContent);
  } else {
    content = content.slice(
      (query.current - 1) * query.oneContent,
      query.current * query.oneContent
    );
  }
  ctx.body = {
    content,
    max,
    currentPage,
    onePageContent,
  };
});

router.get("/api/getStatusList", async (ctx) => {
  // ctx.query
  let data = require("../jsonData/statusTest.json");
  let query = ctx.query;
  let searchVal = query.searchVal;
  let content = data.content;
  if (query.onlySelf === "true") {
    content = content.filter((val) => {
      //TODO token获取
      return val.anuther === "kilic3";
    });
  }
  if (searchVal) {
    content = content.filter((val) => {
      console.log(val.problem.title);
      console.log(searchVal);
      return val.problem.title.includes(searchVal);
    });
  }
  let max = content.length;
  let currentPage = query.current;
  let onePageContent = query.oneContent;
  if (query.current * query.oneContent > content.length) {
    content = content.slice((query.current - 1) * query.oneContent);
  } else {
    content = content.slice(
      (query.current - 1) * query.oneContent,
      query.current * query.oneContent
    );
  }
  ctx.body = {
    content,
    max,
    currentPage,
    onePageContent,
  };
});

router.get("/api/contestingState", async (ctx, next) => {
  ctx.body = {
    isContesting: true,
    contestingURL: "/contest/1",
  };
});

router.get("/api/contestAnnouncement", async (ctx) => {
  ctx.body = "<p>这是一段测试公告，支持富文本标签</p>";
});

router.get("/api/getRegionJson", async (ctx) => {
  const provinceJson = require("../public/json/province.json");
  const cityJson = require("../public/json/city.json");
  const countyJson = require("../public/json/county.json");
  ctx.body = {
    provinceJson,
    cityJson,
    countyJson,
  };
});

router.post("/api/postUserMsg", (ctx) => {
  ctx.body = ctx.request.body;
});
router.post("/api/uploadHeadPic", async (ctx) => {
  console.log(ctx.request.files);
  ctx.body = ctx.uploadpath;
});

module.exports = router;
