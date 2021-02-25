import 'App.less'
import '@assets/icons'
import dva,{DvaOption,DvaInstance,Model} from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createHashHistory'
import * as swApp from '@sw/index.ts'
type Extend<T, U> = U & T
const initConfig: DvaOption = {
  history: createHistory(),
}

type ReduxSotre = {
  getState(arg: any): any;
  dispatch(arg: any): any;
  subscribe(listener: () => void): any;
  replaceReducer(nextReducer: any): any;
}

type App = Extend<DvaInstance, {
  _store?: ReduxSotre;
  _models?: Model[];
}>

let app: App = dva(createLoading(initConfig))
app.router(require('routes/Index').default)
app.start('#app')
swApp.register()
