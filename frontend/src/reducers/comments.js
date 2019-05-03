import {FETCH_COMMENTS, VOTE_COMMENT, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT} from '../actions/comments'

export default function comments(state = {}, action) {
  const {comments, comment} = action
  switch (action.type) {
    case FETCH_COMMENTS:
      return comments
    case VOTE_COMMENT:
    case UPDATE_COMMENT:
      return state.map(c => {
        if(c.id === comment.id){
          return comment
        }
        return c
      })
    case ADD_COMMENT:
      return state.concat(comment)
    case DELETE_COMMENT:
      return state.filter(c => c.id !== comment.id)
    default:
      return state
  }
}
