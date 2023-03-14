// 定义一套统一的restful风格的取数据接口
import axios from "axios";
import { genRandomParams } from '@/utils/index'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;
console.log(axios.defaults.baseURL);
axios.defaults.timeout = 12000;

// type-题材，state-状态，sort-排序 (0都是代表全部) page-分页
export const getList = function (params, page = 1) {
  return axios.get("list", {
    params: {
      ...params,
      page
    },
  });
}

// 随机取一也数据
export const getRandomList = function () {
  let params = genRandomParams()
  return getList(params)
}

// 随机获取高人气漫画
export const getHotList = function () {
  let params = genRandomParams()
  params.sort = 10
  return getList(params)
}

// 获取最近更新的漫画
export const getUpdateList = function (page) {
  let params = {
    type: 0,
    state: 0,
    sort: 2,
  };
  return getList(params, page)
}

export const getSearchList = function (title, page) {
  const params = {
    title
  }
  return getList(params, page);
}


export const getDeatil = function (id) {
  return axios.get("detail", {
    params: {
      id
    }
  })
}

// cid, mid, page
export const getManga = function (params) {
  return axios.get("manga", {
    "responseType": 'arraybuffer',
    params: {
      ...params
    },
  })
}

