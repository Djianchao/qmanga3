const types = [31, 2, 1, 26, 25, 11, 17, 15, 34];
const states = [1, 2];
const sorts = [10, 2];

// 生成获取列表的随机参数
export function genRandomParams() {
  let type = types[Math.round(Math.random() * (types.length - 1))];
  let state = states[Math.round(Math.random() * (states.length - 1))];
  let sort = sorts[Math.round(Math.random() * (sorts.length - 1))];
  return { type, state, sort };
}