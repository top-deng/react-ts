import Users from './Users'
const MainServer=new Map()
const init=() => {
  MainServer.set('Users',Users)
}
init()
export default MainServer
