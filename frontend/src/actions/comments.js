import {getCommentsForPostAPI, voteOnCommentAPI, deleteCommentAPI } from '../utils/api.js'
import {showLoading, hideLoading} from 'react-redux-loading'

export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SHOW_COMMENT_FORM = 'SHOW_COMMENT_FORM'
export const HIDE_COMMENT_FORM = 'HIDE_COMMENT_FORM'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const handleComments = (postId) => dispatch => {
    dispatch(showLoading())
    return getCommentsForPostAPI(postId).then((comments) => {
      dispatch({
        type: FETCH_COMMENTS,
        comments,
      })
      dispatch(hideLoading())
    })
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment,
  }
}

export function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment,
  }
}

export function showCommentForm(comment) {
  return {
    type: SHOW_COMMENT_FORM,
    comment,
  }
}

export function hideCommentForm() {
  return {
    type: HIDE_COMMENT_FORM
  }
}

export const handleVoteOnComment = (commentId, isLiked) => dispatch => {
    dispatch(showLoading())
    return voteOnCommentAPI(commentId, isLiked).then((comment) => {
      dispatch({
        type: VOTE_COMMENT,
        comment,
      })
      dispatch(hideLoading())
    })
}

export const handleDeleteComment = (commentId) => dispatch => {
    dispatch(showLoading())
    return deleteCommentAPI(commentId).then((comment) => {
      dispatch({
        type: DELETE_COMMENT,
        comment,
      })
      dispatch(hideLoading())
    })
}
