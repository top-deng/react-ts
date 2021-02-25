export enum Methods {
  GET = 'GET',
  POST = 'POST',
  FORMDATE = 'FORMDATE',
  MOVE = 'DELETE',
  PUT = 'PUT'
}

export enum HttpStates {
  SUCCESS = 200, //成功
  ERROR = 500, //接口错误
  NUllV = 404, //接口错误
  ROLE = 503, //没有请求权限
  SERVERMAX = 413, //网络请求频繁
  NEtERROR = 403 //服务挂了
}

interface Data {
  menage?: string;
  data: Array<any> | Object;
  list?: Array<any> | Object;
}

export const DefaultPage = {
  pageNo: 1,
  pageSize: 10,
  total: 0
}

export interface Loading {
  global: boolean;
  models: any;
  effects: any;
}

export class MokaData {
  msg?: string
  code?: Number
  data: Data | any
  pageNo?: number
  pageSize?: number
  total?: number
}

export interface MockItem {
  text: string;
  value: string;
}
