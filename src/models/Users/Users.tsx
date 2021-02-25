import Servers from '@services/Servers'
import names from '@namespaces/Index'
import { FormEnter, } from '@entity/FormEnter'
import { DefaultPage } from '@services/Interfaces'
export default {
  namespace: names.Users,
  state: {
    res: {
      page: DefaultPage,
      data: []
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
  reducers: {
    setData(state, action) {
      state.res=action.data
      return {...state}
    },
  },
  effects: {
    *queryUsers(form: FormEnter, {put,call }) {
      const res=yield call(Servers.user.queryUsers,form.data)
      const {pageNo,pageSize,total,data}=res
      const page={pageNo,pageSize,total}
      const result={page,data}
      yield put({
        type: 'setData',
        data: result
      })
    },
  }
}
