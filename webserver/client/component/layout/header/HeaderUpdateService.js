// @flow

import store from '../../../store/store';
import { getHeaderModel } from '../../../store/getCurrentModelService';
import { update } from './headerActionCreator';
import type { _PAGE_ENUM } from '../../../enum/PAGE_ENUM';

export function resetAndSetPage(label: _PAGE_ENUM): void {
  store.dispatch(update(getHeaderModel().resetAndSetPage(label)));
}
