export default {
  queryUsers: {
    mock: true,
    msg: '成功',
    code: 200,
    data: [
      {
        'userName': '摩卡',
        'id': 1,
      },
    ]
  },
  login: {
    mock: true,
    msg: '成功',
    code: 200,
    data: {
      'userName': '摩卡',
      'id': 1,
    },
  }
}
