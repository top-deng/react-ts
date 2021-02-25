import { Col } from '@entity/FormEnter'
/**
 * 根据数据源对象生成table列数据源
 * @param cols
 */
export const NewTableCol=(cols: any) => {
  const array=new Array<Col<any>>()
  Object.keys(cols).map((keyName) => {
    let col=new Col()
    if(typeof(cols[keyName])==='object') {
      col.dataIndex=keyName
      col.key=keyName
      col=Object.assign(col,cols[keyName])
    }else{
      col.title=cols[keyName]
      col.dataIndex=keyName
      col.key=keyName
    }
    array.push(col)
  })
  return array
}
