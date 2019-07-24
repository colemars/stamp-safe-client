import { ADD_IMAGE } from "../constants/action-types";

const initialState = {
  images: []
};

export default function images(state = initialState, action) {
  if (action.type === ADD_IMAGE) {
    const newImages = [...state.images, action.payload ];
    return ({...state, images: newImages});
  }
  return state;
}