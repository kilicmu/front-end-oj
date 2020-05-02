import { Store } from "@/store/store";
/**
 * 将一个临时表单对象深拷贝
 * @param targetMsg 被赋值对象
 * @param msg 赋值信息
 */
const updateUserMsg = (
  targetMsg: Store.PostUserMsg,
  msg: Store.PostUserMsg
) => {
  targetMsg.mail = msg.mail;
  targetMsg.description = msg.description;
  const from = {};
  for (const item in msg.from) {
    from[item] = {};
    for (const tmpItem in msg.from[item]) {
      from[item][tmpItem] = msg.from[item][tmpItem];
    }
  }
  targetMsg.from = from as any;
  targetMsg.headPic = msg.headPic;
  targetMsg.blogUrl = msg.blogUrl;
  const tags = [];
  for (const item of msg.tags) {
    const tmp: any = {};
    tmp.value = item.value;
    tmp.empty = item.empty;
    tags.push(tmp);
  }
  targetMsg.tags = tags;
};

export { updateUserMsg };
