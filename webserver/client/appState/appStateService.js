// @flow

import store from './../store/store';
import { setPageLoading as _setPageLoading } from './appStateActionCreator';

export function setPageLoading(bool: boolean, setTime?: number): void {
  if (setTime) {
    setTimeout(() => {
      store.dispatch(_setPageLoading(bool));
    }, setTime);

    return;
  }

  store.dispatch(_setPageLoading(bool));
}
