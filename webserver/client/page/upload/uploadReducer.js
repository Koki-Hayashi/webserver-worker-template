// @flow

import type { _ACTION } from '../../service/actionCreatorService';
import { ACTION } from './uploadActionCreator';
import UploadModel from './uploadModel';

const initialState: { upload: UploadModel } = {
  upload: new UploadModel()
};

export default function update(
  state: { upload: UploadModel } = initialState,
  action: _ACTION
) {
  if (ACTION === action.type) {
    return Object.assign({}, state, {
      upload: action.model
    });
  }

  return state;
}
