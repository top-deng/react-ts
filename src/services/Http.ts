import qs from 'qs'
import Fetch from 'dva/fetch'
import {Methods,HttpStates,MokaData} from '@services/Interfaces'
import MockFactory from '@mock/MockFactory'
import {config} from '@services/Config'
/**
 * log 日志
 */
class httpLog {
  static hr() {
    console.log('%c 🏁 debug==>*****************************************', 'color:blue')
  }
  static info(param: any) {
    console.log(`%c 🌿 debug==>请求方式：${param.method}`, 'color:red')
    console.log(`%c 🧖 debug==>请求url：${param.url}`, 'color:red')
    console.log('%c 🐎 debug==>请求参数:', 'color:red')
    console.log(param.body, 'color:red')
    console.table(param)
    httpLog.hr()
  }
  static Result(param: any) {
    console.log('%c 🌿 debug==>返回结果', 'color:red')
    console.table(param)
    httpLog.hr()
  }
}

/**
 * 请求头类
 */
class headers {
  static post() {
    return {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${window.localStorage.token||''}`
    }
  }
}

/**
 * http 请求体
 */
type From= {
  method: string,
  headers: any,
  mobF: string,
  body?: any,
  mode?: string,
  namespace: string
}
/**
 * 统一结果集返回
 * @param body 接口响应的数据
 * @param json 请求的原始数据 主要用于有些接口不规范的话需要根据参数确定正确的响应数据结构
 */
const getHttpResult=(body: any,json: any) => {
  const result=new MokaData()
  const info=getRespontInfo(body)
  result.msg=info.msg
  result.code=info.eror?500:200
  if(info.eror) {
    if(typeof(json.pageNo)!='undefined') {
      result.data=[]
      result.total=0
      result.pageNo=1
      result.pageSize=10
    }else{
      result.data={}
    }
  }else{
    //这里数据判断没那么简单，自行扩展
    if(typeof(json.pageNo)!='undefined') {
      result.data=body.data.list||[]
      result.total=body.data.total||0
      result.pageNo=body.data.pageNo||1
      result.pageSize=body.data.pageSize||10
    }else{
      result.data=body.data.data||body.data
    }
  }
  return result
}
/**
 * 检验响应数据状态信息
 * @param response
 */
const getRespontInfo=(response) => {
  const resultInfo={eror: true,msg: ''}
  //自己扩展其他状态
  if(HttpStates.SUCCESS==response.code) {
    resultInfo.msg=response.message
    resultInfo.eror=false
  }else if(response.code==HttpStates.ROLE) {
    resultInfo.msg='暂无接口权限!'
  }else if(response.code==HttpStates.SERVERMAX) {
    resultInfo.msg='请勿频繁请求服务,稍后再试!'
  }else if(response.code==HttpStates.ERROR) {
    resultInfo.msg='服务异常!'
  }else{
    resultInfo.msg=response.message
  }
  return resultInfo
}
/**
 * 响应体处理
 * @param response 自己扩展做数据错题处理
 */
const parseJSON=(response) => {
  return response.json()
}

/**
 * http 请求
 * @param url   请求接口url
 * @param form  最终请求的数据
 * @param json  原始数据
 */
const httpRequest = async (url: string, form: From, json: any): Promise<MokaData> => {
  const server=(MockFactory.get(form.namespace))
  const funObj=server?server[form.mobF]:{}
  httpLog.hr()
  httpLog.info({ url: url,method: form.method,body: form.body})
  if(!funObj||!funObj.mock) {
    return new Promise((resolve,reject) => {
      Fetch(config.appApis.API+url,form).then(parseJSON).then((result) => {
        const data=getHttpResult(result,json)
        if(data.code!=500) {
          resolve(data)
        }else{
          reject(data)
        }
      }).catch((res) => {
        reject({msg: '服务异常!',code: 500})
      })
    })
  }else{
    return new Promise<MokaData>((resolve) => resolve(funObj))
  }
}


/**
 * http 接口定义
 */
interface Http{
  post(url: string,body: any,namespace: string,mobF: string): Promise<MokaData>
}

/**
 * http 工具类
 */
class Request implements Http {
  post(url,body,namespace,mobF) {
    return httpRequest(url,{
      method: Methods.POST,
      headers: headers.post(),
      body: qs.stringify(body),
      namespace,
      mobF
    },body)
  }
}

export default new Request()
