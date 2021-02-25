export interface FormEnter {
  type?: string;
  data: any;
}
export interface Page {
  pageNo: number;
  pageSize: number;
  total: number;
}
export class Col<T> {
  title: string
  key?: React.Key
  dataIndex?: string
  render?: (text: any, record: T, index: number) => React.ReactNode
  onFilter?: (value: any, record: T) => boolean
  width?: string | number
  filteredValue?: any[]
  children?: Col<T>[]
}
