import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import createRootReducer from './../reducers'
import monitorReducersEnhancer from './../enhancers/monitorReducer'
import loggerMiddleware from './../middleware/logger'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware, routerMiddleware(history)]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(createRootReducer(history), preloadedState, composedEnhancers)

  return store
} 