const utils = {
  iterate: (list, cb) => {
    for (const item of list) {
      cb(item);
    }
  },
};

export default utils;
