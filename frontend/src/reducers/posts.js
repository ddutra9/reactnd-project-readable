import {DELETE_POST, ADD_POST, UPDATE_POST, VOTE_POST, FETCH_CATEGORY_POSTS, RECEIVE_POSTS} from '../actions/posts'
import {SORT_POST_BY} from '../actions'

export default function posts(state = {}, action) {
  const { posts, post, type, sortBy} = action
  switch (type) {
    case FETCH_CATEGORY_POSTS:
      if(posts) {
        return posts.reduce((obj, p) => {
          obj[p.id] = p
          return obj
        }, {})
      }
      return state
    case RECEIVE_POSTS: 
      return posts
    case VOTE_POST:
    case ADD_POST:
    case UPDATE_POST:
    case DELETE_POST:
      return {
        ...state,
        [post.id]: post
      }
    case SORT_POST_BY:
       return sortBy
    default:
      return state
  }
}
