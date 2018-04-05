// @flow

import type { _ACTION } from '../../../service/actionCreatorService';
import { createAction } from '../../../service/actionCreatorService';
import HeaderModel from './headerModel';

export const ACTION = Symbol('ACTION');

export type _ACTION_CREATORS = {
  update: Function
};

export function update(headerModel: HeaderModel): _ACTION {
  return createAction(ACTION, headerModel);
}
