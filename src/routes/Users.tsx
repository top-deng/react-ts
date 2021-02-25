const routes = [
  {
    path: '/alibaba/users',
    models: () => [import('@models/Users/Users')],
    component: () => import('@view/Users/Users')
  }
]

export default routes
