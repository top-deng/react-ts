import './AppLayout.less'
import { withRouter } from 'dva/router'
import React from 'react'
import zhCN from 'antd/es/locale/zh_CN'
import { connect } from 'dva'
import 'moment/locale/zh-cn'
import {Layout, ConfigProvider} from 'antd'
const { Content } = Layout
const  AppLayout =({children,history}) => {
  const list=history.location.pathname.split('/')
  const comName=list[list.length-1]
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Content>
          <Content className={'mob-content app-com-'+comName}>{children}</Content>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}
export default withRouter(connect(({ app }) => ({ app }))(AppLayout))
