import {FETCH_COMMENTS, VOTE_COMMENT, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, SHOW_COMMENT_FORM, HIDE_COMMENT_FORM} from '../actions/comments'

export function comments(state = {}, action) {
  const {comments, comment} = action
  switch (action.type) {
    case FETCH_COMMENTS:
      if(comments) {
        return comments.reduce((obj, c) => {
          obj[c.id] = c
          return obj
        }, {})
      }
      return state
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
    case SHOW_COMMENT_FORM:
      return {
       comment,
       isOpen: true
      }
    case HIDE_COMMENT_FORM:
     return {
       isOpen: false
     }
    default:
      return state
  }
}
