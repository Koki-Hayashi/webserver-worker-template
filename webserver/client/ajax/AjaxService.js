// @flow

const { logout } = require('../service/logoutService');
import config from '../configs/config';
const service = config.endpoint;
import { NOT_AUTHORIZED } from '../../universal/enum/HTTP_STATUS';
import queryString from 'query-string';

export default class AsyncService {
  path: string;
  headers: {};
  method: string;
  body: any;
  qs: {};

  constructor(path: string) {
    this.path = service.url_base + path;
  }

  header(headers: {}): AsyncService {
    this.headers = headers;
    return this;
  }

  addHeader(key: string, value: any): AsyncService {
    const headers = this.headers || {};

    headers[key] = value;
    return this;
  }

  setMethod(method: string): AsyncService {
    this.method = method;
    return this;
  }

  get(): AsyncService {
    this.method = 'GET';
    return this;
  }

  post(): AsyncService {
    this.method = 'POST';
    return this;
  }

  put(): AsyncService {
    this.method = 'PUT';
    return this;
  }

  // I know, I know...!!
  delete(): AsyncService {
    this.method = 'DELETE';
    return this;
  }

  json(): AsyncService {
    return this.addHeader('Content-Type', 'application/json');
  }

  form(): AsyncService {
    return this.addHeader('Content-Type', 'multipart/form-data');
  }

  body(body: any): AsyncService {
    this.body = body;
    return this;
  }

  // expecting an object e.g, {user: '123'}
  qs(qs: {}): AsyncService {
    this.qs = qs;
    return this;
  }

  async call(onSuccess: Function, onError: Function): Promise<any> {
    const qs = queryString.stringify(this.qs, { encode: true });

    const res: any = await fetch(this.path + (qs ? '?' + qs : ''), {
      method: this.method || 'GET',
      credentials: 'include',
      body: this.body
    }).catch(error => {
      if (onError) {
        return onError(error);
      }

      return Promise.reject(error);
    });

    if (res.status === NOT_AUTHORIZED) {
      logout();
      return Promise.resolve();
    }

    if (!res.ok) {
      const text = await res.text(); // assume response body is text when error

      if (onError) {
        return onError(text);
      }

      return Promise.reject(text);
    } else {
      const json = await res.json();
      if (onSuccess) {
        return onSuccess(json);
      }

      return Promise.resolve(json);
    }
  }
}
