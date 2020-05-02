const fs = require("fs");
const path = require("path");
module.exports = {
  getStampDirName() {
    const date = new Date();
    let month = Number(date.getMonth()) + 1;
    month = month.toString().length > 1 ? month : `0${month}`;
    return `${date.getFullYear()}${month}${date.getDate()}`;
  },
  checkDirExist(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  },
  getFileExt(name) {
    const ext = name.split(".");
    return ext[ext.length - 1];
  },
  getFileName(path) {
    const fileName = path.split("/");
    return fileName[fileName.length - 1];
  },
};
