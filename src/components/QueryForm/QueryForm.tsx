import './QueryForm.less'
import React,{useEffect} from 'react'
import { connect } from 'dva'
import { Form, Input, Button } from 'antd'
//参数类型定义
interface DataItem {
  label: string,
  value: string,
}
interface FormItem {
  label: string,
  type: string,
  name: string,
  placeholder: string,
  data?: Array<DataItem>
}
interface IEntranceState {
}
interface IEntranceProps {
  layout: 'inline' | 'horizontal' | 'vertical',
  form: any,
  onQuery: Function,
  formItems: Array<FormItem>
}
const QueryForm=(props: IEntranceProps,state: IEntranceState) => {
  const { form, layout, formItems }=props
  const { getFieldDecorator,getFieldsError } = form
  const hasErrors=(fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }
  const onReset = () => {
    props.form.resetFields()
  }
  const onSubmit = () => {
    const { form,onQuery }=props
    form.validateFields((err, values) => {
      let data: any={}
      Object.keys(values).filter((keyName) => {
        return values[keyName]?true:false
      }).map((keyName) => {
        data[keyName]=values[keyName]
      })
      onQuery(data)
    })
  }
  useEffect(() => {
  },[])
  return (
    <div>
      <Form layout={layout||'inline'}>
        {
          formItems.map((item,index) => {
            if(item.type=='input') {
              return<Form.Item key={index} label={item.label}>
                {getFieldDecorator(item.name, {rules: [{ required: false, message: '请输入'+item.label}]})(
                  <Input allowClear placeholder={item.placeholder}/>
                )}
              </Form.Item>
            }
          })
        }
        <Form.Item>
          <Button type="primary" onClick={ onSubmit} disabled={hasErrors(getFieldsError())}> 搜索 </Button>
          <Button className="ml-10" onClick={ onReset}> 重置 </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

QueryForm.defaultProps = {
  formItems: []
}
export default connect()(Form.create<IEntranceProps>()(QueryForm))
