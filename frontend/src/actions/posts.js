import {getAllPostsAPI, getAllPostsInCategoryAPI, voteOnPostAPI, deletePostAPI} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const SHOWING_CATEGORY_POSTS = 'SHOWING_CATEGORY_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'

export const handleReceivePosts = (category) => dispatch => {
    dispatch(showLoading())
    return getAllPostsInCategoryAPI(category).then((posts) => {
      dispatch({
        type: FETCH_CATEGORY_POSTS,
        posts,
      })
      dispatch({
        type: SHOWING_CATEGORY_POSTS,
        category,
      })
      dispatch(hideLoading())
    })
}

export const handleReceivePosts = () => dispatch => {
    dispatch(showLoading())
    return getAllPostsAPI().then((posts) => {
      dispatch({type: RECEIVE_POSTS, posts})
      dispatch(hideLoading())
    })
}

export function handleAddPosts(text, replyingTo) => (dispatch, getState) => {
  dispatch(showLoading())

  return saveTweet({
    text,
    author: authedUser,
    replyingTo
  })
    .then((post) => dispatch(addPost(post)))
    .then(() => dispatch(hideLoading()))
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post,
  }
}

export const handleVoteOnPost = (postId, isLiked) => dispatch => {
    dispatch(showLoading())
    return voteOnPostAPI(postId, isLiked).then((post) => {
      dispatch({
        type: VOTE_POST,
        post,
      })
      dispatch(hideLoading())
    })
}

export const handleDeletePost = (postId) => dispatch => {
    dispatch(showLoading())
    return deletePostAPI(postId).then((post) => {
      dispatch({
        type: DELETE_POST,
        post,
      })
      dispatch(hideLoading())
    })
}
