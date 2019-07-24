import { ADD_FIELDS } from "../constants/action-types";

const initialState = {
  fields: []
};

export default function fields(state = initialState, action) {
  if (action.type === ADD_FIELDS) {
    const newFields = action.payload;
    return ({...state, fields: newFields});
  }
  return state;
}