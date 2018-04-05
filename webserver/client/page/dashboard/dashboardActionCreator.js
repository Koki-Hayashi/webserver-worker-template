// @flow
import type { _ACTION } from '../../service/actionCreatorService';
import { getDashboardModel } from '../../store/getCurrentModelService';
import { createAction } from '../../service/actionCreatorService';

export const ACTION = Symbol('ACTION');

export type _ACTION_CREATORS = {
  reset: Function,
  fetch: Function
};

export function reset(): _ACTION {
  return createAction(ACTION, getDashboardModel().reset());
}

export function fetch(): Function {
  return function(dispatch) {
    const beforeFetch = getDashboardModel().beforeFetch();
    dispatch(createAction(ACTION, beforeFetch));

    return beforeFetch
      .fetch()
      .then(dashboard => {
        dispatch(createAction(ACTION, dashboard));
      })
      .catch(err => {
        dispatch(createAction(ACTION, err));
      });
  };
}
