import {ACTION} from './headerActionCreator'
import HeaderModel from "./headerModel";

const initialState = {
  'header': new HeaderModel()
};

export default function update(state = initialState, action) {
  if (ACTION === action.type) {
    return Object.assign({},
        state,
        {
          header: action.model
        });
  }

  return state;
}
