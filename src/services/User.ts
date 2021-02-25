import Http from '@services/Http'
import nps from '@namespaces/Index'

const userApis ={
  login: (data: any) => '/user/login',// 登录接口
  queryUsers: (data: any) => '/user/queryUsers',// 查询用户列表
}

/**
 * user 模块接口
 * @class User
 */
const User= {
  login: (data: any) => Http.post(userApis.login(data),data,nps.Users,'login'),
  queryUsers: (data: any) => Http.post(userApis.queryUsers(data),data,nps.Users,'queryUsers'),
}

export default User


