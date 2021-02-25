/**举个例子 */
import './MokaTable.less'
import React,{useState,useImperativeHandle, useEffect} from 'react'
import { Table} from 'antd'
import { Col } from '@entity/FormEnter'
interface SelectType {
  RowKeys: Array<any>,
  Rows: Array<any>
}
interface IEntranceProps {
  tableRef?: any,
  children?: any,
  scroll?: {x?: number|string, y?: number|string},
  rowKey?: string,
  rowSelection?: boolean,
  pagination?: Pagination,
  data: Array<any>,
  loading?: false | boolean,
  columns: Array<Col<any>>,
  onChange?: ({pageNo: number}) => void,
  onRowSelect?: (data: SelectType) => void
}
interface Pagination{
  pageNo: number,
  pageSize: number,
  total: number,
  showSizeChanger?: boolean
}
interface IEntranceState {
}
/**只写了基础东西自行扩展 */
const MokaTable =(props: IEntranceProps,state: IEntranceState) => {
  const { tableRef } = props
  const [RowKeys,setRowKeys] = useState([])
  const [Rows,setRows] = useState([])
  let qform: any={}
  const onChange=(current: number,pageSize: number) => {
    qform.pageSize=pageSize
    qform.current=current
  }
  const onRowSelect=(RowKeys,Rows) => {
    setRowKeys(RowKeys)
    setRows(Rows)
    props.onRowSelect?props.onRowSelect({RowKeys,Rows}):null
  }
  useImperativeHandle(tableRef, () => ({
    onRowSelect: onRowSelect,
    RowKeys,
    Rows
  }))
  useEffect(() => {
    qform={}
  },[])
  return (
    <section>
      <Table
        ref={tableRef}
        scroll={props.scroll}
        rowKey={record => record[props.rowKey||'id']}
        rowSelection={props.rowSelection?{selectedRowKeys: RowKeys,onChange: onRowSelect}:null}
        pagination={{
          total: props.pagination.total,
          current: props.pagination.pageNo,
          pageSize: props.pagination.pageSize,
          showSizeChanger: props.pagination.showSizeChanger||false,
          onChange: onChange,
          onShowSizeChange: onChange
        }}
        dataSource={props.data}
        loading={props.loading}
        columns={props.columns}>
      </Table>
    </section>

  )
}
export default MokaTable
