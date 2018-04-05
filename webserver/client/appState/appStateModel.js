// @flow

import { Record } from 'immutable';

const AppStateRecord = Record({
  authCheck: false,
  initLoadFinished: false,
  pageLoading: false
});

export default class AppState extends AppStateRecord {
  setAuthCheckTrue(): AppState {
    return this.set('authCheck', true);
  }

  setInitLoadFinished(): AppState {
    return this.set('initLoadFinished', true);
  }

  setPageLoading(bool: boolean): AppState {
    return this.set('pageLoading', bool);
  }
}
