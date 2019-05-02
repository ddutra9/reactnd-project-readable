import {FETCH_COMMENTS, VOTE_COMMENT, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT} from '../actions/comments'

export default function comments(state = {}, action) {
  const {comments, comment} = action
  switch (action.type) {
    case FETCH_COMMENTS:
      return comments
    case VOTE_COMMENT:
    case ADD_COMMENT:
    case UPDATE_COMMENT:
      return {
        ...state,
        [comment.id] : comment
      }
    case DELETE_COMMENT:
      delete state[comment.id]
      return state
    default:
      return state
  }
}
