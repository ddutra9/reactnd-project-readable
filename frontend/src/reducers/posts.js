import {DELETE_POST, ADD_POST, UPDATE_POST, VOTE_POST, FETCH_CATEGORY_POSTS, RECEIVE_POSTS, SORT_POST_BY} from '../actions/posts'

export default function posts(state = {}, action) {
  const { posts, post, type, sortBy} = action
  switch (type) {
    case FETCH_CATEGORY_POSTS:
    case RECEIVE_POSTS: 
      return posts
    case VOTE_POST:
    case ADD_POST:
    case UPDATE_POST:
      return state.map(p => {
        if(p.id === post.id){
          return post
        }
        return p
      })
    case DELETE_POST:
      return state.filter(p => p.id !== post.id)
    case SORT_POST_BY:
       return posts
    default:
      return state
  }
}
