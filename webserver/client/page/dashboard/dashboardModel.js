// @flow

import APP_STATE from '../../enum/APP_STATE';
import { IMAGE } from '../../../universal/enum/END_POINT';
import { Record } from 'immutable';
import AjaxService from '../../ajax/AjaxService';

const DashboardRecord = Record({
  data: [],
  status: APP_STATE.NEUTRAL
});

export default class DashboardModel extends DashboardRecord {
  reset(): DashboardModel {
    return new DashboardModel();
  }

  beforeFetch(): DashboardModel {
    return this.set('status', APP_STATE.FETCHING);
  }

  onFetchSuccess(data: []): DashboardModel {
    return this.set('data', data).set('status', APP_STATE.FETCHED);
  }

  onFetchError(error: {}): DashboardModel {
    return this.set('status', APP_STATE.FAILED_TO_FETCH);
  }

  fetch(): Promise<DashboardModel> {
    return new AjaxService(IMAGE).call(
      this.onFetchSuccess.bind(this),
      this.onFetchError.bind(this)
    );
  }
}
