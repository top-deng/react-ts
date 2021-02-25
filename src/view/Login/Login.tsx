import './Login.less'
import React,{useEffect,useState} from 'react'
import { Button, Input,Form,message } from 'antd'
import { connect } from 'dva'
import Servers from '@services/Servers'
import {FormPros, FormSate} from '@entity/Modal'
import {FormValues} from './InterFace'
import {MokaData} from '@services/Interfaces'
import { withRouter } from 'dva/router'
const Login=(props: FormPros,state: FormSate) => {
  const [loading, setLoading] = useState(false)
  const { form }=props
  const { getFieldDecorator } = form
  //业务请求
  const login= (qform: FormValues) => {
    setLoading(true)
    Servers.user.login(qform)
      .then((res: MokaData) => {
      ///其他代码
        props.history.push('/alibaba/users')
        setLoading(false)
      })
      .catch((res) => {
        message.error(res.msg)
        setLoading(false)
      })
  }
  //数据验证
  const getFormError=(values: FormValues) => {
    let menage=''
    if(!values.userName) {
      menage='请输入登录账号!'
    }else if(!values.password) {
      menage='请输入登录密码!'
    }
    return menage
  }
  //业务流程开始
  const inLogin=() => {
    props.form.validateFieldsAndScroll((err, values) => {
      let error=getFormError(values)
      if (error) {
        message.error(error)
      }else{
        login(values)
      }
    })
  }
  //生命周期创建
  useEffect(() => {
    ///其他代码
  },[])
  return (
    // 自己写样式
    <div className="login-page">
      <Form>
        <Form.Item>{
          getFieldDecorator('userName', { rules: [ { required: false, message: '请输入登录邮箱',}],})(<Input allowClear placeholder='请输入登录邮箱'></Input>)
        }
        </Form.Item>
        <Form.Item>{
          getFieldDecorator('password', { rules: [ { required: false, message: '请输入登录密码',}],})(<Input allowClear  placeholder='请输入登录密码' type='password'></Input>)
        }
        </Form.Item>
        <Button className="login-botton" type="primary" loading={loading} onClick={inLogin}>
           啪啪啪
        </Button>
      </Form>
    </div>
  )
}
export default withRouter(connect(({ app }) => ({ app }))(Form.create<FormPros>()(Login)))
