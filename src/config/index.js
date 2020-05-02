const mailReg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
const loginRule = {
  username: [
    {
      required: true,
      message: "请输入用户名或email哦",
      trigger: "blur",
    },
    {
      type: "string",
      min: 6,
      message: "长度最小为6字节",
      trigger: "blur",
    },
    {
      type: "string",
      max: 26,
      message: "长度最大为26字节",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不可以为空哦",
      trigger: "blur",
    },
    {
      type: "string",
      min: 6,
      message: "密码最少为6位哦",
      trigger: "blur",
    },
    {
      type: "string",
      max: 26,
      message: "密码最多为26位哦",
      trigger: "blur",
    },
  ],
};

export { loginRule, mailReg };
