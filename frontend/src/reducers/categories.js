import {GET_CATEGORIES} from '../actions'
import {SHOWING_CATEGORY_POSTS} from '../actions/posts'

export default function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    case SHOWING_CATEGORY_POSTS:
     return action.category
    default:
      return state
  }
}
