import { ADD_ACCESS_KEY, ADD_LINK_KEY } from '../constants/action-types';

const initialState = { accessKey: null, linkKey: null };

export default function keys(state = initialState, action) {
  if (action.type === ADD_ACCESS_KEY) {
    const key = action.payload;
    return { ...state, accessKey: key };
  }
  if (action.type === ADD_LINK_KEY) {
    const key = action.payload;
    return { ...state, linkKey: key };
  }
  return state;
}
