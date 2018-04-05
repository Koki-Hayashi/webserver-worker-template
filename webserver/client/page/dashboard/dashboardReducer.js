// @flow

import { ACTION } from './dashboardActionCreator';
import DashboardModel from './dashboardModel';
import type { _ACTION } from '../../service/actionCreatorService';

const initialState = {
  dashboard: new DashboardModel()
};

export default function update(
  state: { dashboard: DashboardModel } = initialState,
  action: _ACTION
) {
  if (ACTION === action.type) {
    return Object.assign({}, state, {
      dashboard: action.model
    });
  }

  return state;
}
