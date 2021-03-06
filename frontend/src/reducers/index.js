import {combineReducers} from 'redux'
import categories from './categories'
import comments from './comments'
import posts from './posts'
import {loadingBarReducer} from 'react-redux-loading'

export default combineReducers({
  categories,
  comments,
  posts,
  loadingBar: loadingBarReducer,
})
