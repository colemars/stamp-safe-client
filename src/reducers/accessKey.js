import { ADD_STAGE_ACCESS_KEY } from "../constants/action-types";

const initialState = {
};

export default function fields(state = initialState, action) {
  if (action.type === ADD_STAGE_ACCESS_KEY) {
    const key = action.payload;
    return ({...state, stageAccessKey: key});
  }
  return state;
}