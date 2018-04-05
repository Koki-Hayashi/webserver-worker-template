// @flow

import type { _ACTION } from '../../service/actionCreatorService';
import { getUploadModel } from '../../store/getCurrentModelService';
import { createAction } from '../../service/actionCreatorService';

export const ACTION = Symbol('ACTION');

export type _ACTION_CREATORS = {
  reset: Function,
  setImage: Function,
  save: Function
};

export function reset(): _ACTION {
  return createAction(ACTION, getUploadModel().reset());
}

export function setImage(file: File): _ACTION {
  return createAction(ACTION, getUploadModel().setImage(file));
}

export function save(): Function {
  return function(dispatch) {
    const beforeSave = getUploadModel().beforeSave();
    dispatch(createAction(ACTION, beforeSave));

    return beforeSave
      .save()
      .then(upload => {
        dispatch(createAction(ACTION, upload));
      })
      .catch(err => {
        dispatch(createAction(ACTION, err));
      });
  };
}
