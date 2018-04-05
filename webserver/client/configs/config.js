// @flow

const isProd = process.env.NODE_ENV === 'production';

import { API } from '../../universal/enum/END_POINT';

const config = {
  endpoint: {
    host: isProd ? 'https://xxx.com/' : 'http://localhost:3010',
    url_base: API
  },
  cookie: {
    jwt: 'jwt',
    domain: isProd ? 'xxx.com' : ''
  },
  loginUrl: isProd
    ? 'https://xxx.com/api/login'
    : 'http://localhost:3010/api/login',
  logoutUrl: isProd ? 'https://xxx.com/login' : 'http://localhost:3010/login',
  devtool: !isProd
};

export default config;
