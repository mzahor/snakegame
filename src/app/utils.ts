
import { IElConfig } from "./interfaces";

const utils = {
  iterate: (list, cb) => {
    for (const item of list) {
      cb(item);
    }
  },
  createEl: ({tag, style, className, target}: IElConfig) => {
    const el = document.createElement(tag);
    for (const prop in style) {
      if (style[prop]) {
        el.style[prop] = style[prop];
      }
    }
    if (className) {
      el.className = className;
    }
    if (target) {
      target.appendChild(el);
    }
    return el;
  },
};

export default utils;
