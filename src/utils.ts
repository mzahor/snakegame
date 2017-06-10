let utils = {
  iterate: (list, cb) => {
    for (let i = 0; i < list.length; i++) {
      cb(list[i]);
    }
  }
}

export default utils;