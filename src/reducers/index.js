import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import images from './images';
import fields from './itemDetails';
import keys from './keys';

export default history =>
  combineReducers({
    router: connectRouter(history),
    images,
    fields,
    keys
  });
