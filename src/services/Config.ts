interface configType {
  appDate: String;
  appVersion: String;
  appApis: ApiItem;
}
interface ApiItem {
  CDN: String;
  API: String;
}

const getAppApi = (keyName: string): ApiItem => {
  return {
    mock: {
      CDN: '',
      API: '/api'
    },
    dev: {
      CDN: '',
      API: '/api'
    },
    test: {
      CDN: '',
      API: '/api'
    },
    pro: {
      CDN: '',
      API: '/api'
    }
  }[keyName]
}

export const config: configType = {
  appDate: new Date().getFullYear().toString(),
  appVersion: '1.0.0',
  appApis: getAppApi(process.env.APP_ENV)
}
