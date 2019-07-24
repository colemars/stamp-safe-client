import { ADD_IMAGE } from "../constants/action-types";
import { ADD_FIELDS } from "../constants/action-types";


export function addImage(payload) {
  return { type: ADD_IMAGE, payload };
}

export function addFields(payload) {
  return { type: ADD_FIELDS, payload };
}