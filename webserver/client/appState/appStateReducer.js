// @flow

import { ACTION } from './appStateActionCreator';
import AppState from './appStateModel';
import type { _ACTION } from '../service/actionCreatorService';

const initialState = {
  appState: new AppState()
};

export default function update(
  state: { appState: AppState } = initialState,
  action: _ACTION
) {
  if (ACTION === action.type) {
    return Object.assign({}, state, {
      appState: action.model
    });
  }

  return state;
}
