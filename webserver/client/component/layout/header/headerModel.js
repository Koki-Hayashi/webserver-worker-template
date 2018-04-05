// @flow

import { Record } from 'immutable';
import APP_STATE from '../../../enum/APP_STATE';
import type { _PAGE_ENUM } from '../../../enum/PAGE_ENUM';
import { DASHBOARD } from '../../../enum/PAGE_ENUM';

const HeaderRecord = Record({
  page: DASHBOARD,
  appState: APP_STATE.NEUTRAL
});

export default class HeaderModel extends HeaderRecord {
  reset(): HeaderModel {
    return new HeaderModel();
  }

  setPage(pageEnum: _PAGE_ENUM): HeaderModel {
    return this.set('page', pageEnum);
  }

  resetAndSetPage(pageEnum: _PAGE_ENUM): HeaderModel {
    return this.reset().setPage(pageEnum);
  }
}
