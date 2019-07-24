import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import images from './images'
import fields from './itemDetails'

export default (history) => combineReducers({
  router: connectRouter(history),
  images,
  fields
});
