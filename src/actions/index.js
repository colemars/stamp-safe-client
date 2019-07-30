import {
  ADD_IMAGE,
  ADD_FIELDS,
  ADD_STAGE_ACCESS_KEY
} from '../constants/action-types';

export function addImage(payload) {
  return { type: ADD_IMAGE, payload };
}

export function addFields(payload) {
  return { type: ADD_FIELDS, payload };
}

export function addStageAccessKey(payload) {
  console.log(payload);
  return { type: ADD_STAGE_ACCESS_KEY, payload };
}
