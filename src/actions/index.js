import { ADD_ARTICLE } from "../constants/action-types";
import { ADD_IMAGE } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function addImage(payload) {
  return { type: ADD_IMAGE, payload };
}