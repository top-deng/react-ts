import './Users.less'
import React,{useEffect} from 'react'
import { connect } from 'dva'
import {NewTableCol,} from '@uilts/Index'
import {IEntranceProps} from './InterFace'
import MokaTable from '@package/MokaTable/MokaTable'
import QueryForm from '@components/QueryForm/QueryForm'
import {PageFormItems} from './PageData'
//当前页面静态数据源
import { DefaultPage } from '@services/Interfaces'
/**dav数据流 */
const stateProps=(state): IEntranceProps => {
  return {
    res: state.Users.res,
    loading: state.loading
  }
}
/**组件函数 */
const Users=(props: IEntranceProps,state: IEntranceProps) => {
  const columns=NewTableCol({
    id: {
      title: '序号',
      width: 100,
      render: (text, record,index) => {
        return <span> {index+1} </span>
      }
    },
    userName: '用户名称',
    action: {
      title: '操作',
      fixed: 'right',
      render: (text, record) => {
        return <a>编辑</a>
      }
    }
  })
  /**
   * table查询
   * @param data form组件的参数
   */
  const onQuery = (data: any={}) => {
    const qform: any={...props.res.page}
    props.dispatch({ type: 'Users/queryUsers',data: Object.assign(qform,data)})
  }
  useEffect(() => {
    props.res.page=DefaultPage
    onQuery()
  },[])
  return (
    <div className="users-page">
      <QueryForm onQuery={onQuery} formItems={PageFormItems}></QueryForm>
      <MokaTable
        rowSelection
        loading={props.loading.global}
        pagination={{...props.res.page}}
        onChange={onQuery}
        data={props.res.data}
        columns={columns}>
      </MokaTable>
    </div>
  )
}
export default connect(stateProps)(Users)
