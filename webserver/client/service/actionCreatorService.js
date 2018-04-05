// @flow

export type _ACTION = {
  type: any, // flow is not supporting symbol
  model: {}
};

export function createAction(ACTION: any, model: {}) {
  return {
    type: ACTION,
    model: model
  };
}
