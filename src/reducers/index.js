import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { ADD_ARTICLE } from "../constants/action-types";
import images from './images'

const initialState = {
  articles: []
};

function articles(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    const newArticles = [...state.articles, action.payload ];
    return ({...state, articles: newArticles});
  }
  return state;
}

export default (history) => combineReducers({
  router: connectRouter(history),
  articles,
  images
});
