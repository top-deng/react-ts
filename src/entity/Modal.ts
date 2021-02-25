import {FormComponentProps} from 'antd/lib/form'
export interface Modal{
  title: string
}
export interface FormPros extends FormComponentProps{
  title: string
  layout?: 'inline' | 'horizontal' | 'vertical',
  history?: any,
  item: any|null,
  Save: any,
  Close: any
}
export interface FormSate {
  loading: boolean
}
