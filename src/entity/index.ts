/**
* 类型实体类
*/
import { History } from 'history'
export interface ReduxAction {
  type: string,
  [propName: string]: any,
}
export interface Dispatch {
  <A extends ReduxAction>(action: A): A;
}

export type DvaApp = {
  _models: any
  _store: any
  _plugin: any
  use: (...args: any[]) => any
  model: any
  start: any
}
export type RouterProps = {
  history: History
  app: DvaApp
}
