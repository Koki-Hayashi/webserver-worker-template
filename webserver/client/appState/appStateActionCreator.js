// @flow

import { getAppStateModel } from '../store/getCurrentModelService';
import type { _ACTION } from '../service/actionCreatorService';
import { createAction } from '../service/actionCreatorService';

export const ACTION = Symbol('ACTION');

export function setAuthCheckTrue(): _ACTION {
  return createAction(ACTION, getAppStateModel().setAuthCheckTrue());
}

export function initLoadFinish(): _ACTION {
  return createAction(ACTION, getAppStateModel().setInitLoadFinished());
}

export function setPageLoading(bool: boolean): _ACTION {
  return createAction(ACTION, getAppStateModel().setPageLoading(bool));
}
