import React from 'react'
import { Switch, Route,Router, Redirect } from 'dva/router'
import dynamic from 'dva/dynamic'
import { RouterProps } from 'entity'
import AppLayout from '@view/AppLayout/AppLayout'
import Login from '@view/Login/Login'
import Users from './Users'

export const Routes =  ({ history, app}: RouterProps) =>  {
  const routes = [
    ...Users,
  ]
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/login" />)}/>
        <Route key="login" exact path="/login" component={Login}/>
        <AppLayout>
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key} exact path={path} component={dynamic({app,...dynamics})}/>
            ))
          }
        </AppLayout>
      </Switch>
    </Router>

  )
}

export default Routes
