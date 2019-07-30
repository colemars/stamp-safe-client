import {
  ADD_IMAGE,
  ADD_FIELDS,
  ADD_ACCESS_KEY,
  ADD_LINK_KEY
} from '../constants/action-types';

export function addImage(payload) {
  return { type: ADD_IMAGE, payload };
}

export function addFields(payload) {
  return { type: ADD_FIELDS, payload };
}

export function addAccessKey(payload) {
  return { type: ADD_ACCESS_KEY, payload };
}

export function addLinkKey(payload) {
  return { type: ADD_LINK_KEY, payload };
}
