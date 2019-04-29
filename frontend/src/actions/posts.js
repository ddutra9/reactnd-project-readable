import {getAllPostsAPI, getAllPostsInCategoryAPI, voteOnPostAPI, deletePostAPI, addPostAPI, editPostAPI} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const SHOWING_CATEGORY_POSTS = 'SHOWING_CATEGORY_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const SORT_POST_BY = 'SORT_POST_BY'

export const handleReceivePostsBy = (category) => dispatch => {
    dispatch(showLoading())
    if(category){
      return getAllPostsInCategoryAPI(category).then((posts) => {
        dispatch({
          type: FETCH_CATEGORY_POSTS,
          posts,
        })
      }).then(() => dispatch(hideLoading()))
    }
    
    return getAllPostsAPI().then((posts) => {
      dispatch({type: RECEIVE_POSTS, posts})
    }).then(() => dispatch(hideLoading()))
}

export function sortPost(post) {
  return {
    type: SORT_POST_BY,
    post,
  }
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const handleSortPost = (order, posts) => dispatch => {
  switch(order){
    case 'timestampDesc':
      posts = posts.sort(function(postA, postB) {
        return postB.timestamp - postA.timestamp;
      })
      break
    case 'voteScoreAsc':
      posts = posts.sort(function(postA, postB) {
        return postA.commentCount - postB.commentCount;
      })
      break
    case 'voteScoreDesc':
      posts = posts.sort(function(postA, postB) {
        return postB.commentCount - postA.commentCount;
      })
      break
    default:
      posts = posts.sort(function(postA, postB) {
        return postA.timestamp - postB.timestamp;
      })
  }

  dispatch({
    type: SORT_POST_BY,
    posts,
  })

  return posts
}

export const handleAddPosts = (title, category, body, author) => (dispatch, getState) => {
  dispatch(showLoading())

  const data = {id: generateUID (), title: title, category: category, body: body, author: author}

  return addPostAPI(data).then((post) => {
    dispatch({type: ADD_POST, post})
  }).then(() => dispatch(hideLoading()))
}

export const handleUpdatePosts = (id, title, body) => (dispatch, getState) => {
  dispatch(showLoading())
  
  const data = {postId: id, title: title, body: body}

  return editPostAPI(data).then((post) => {
    dispatch({type: UPDATE_POST, post})
  }).then(() => dispatch(hideLoading()))
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
    }).then(dispatch(hideLoading()))
}

export const handleDeletePost = (postId) => dispatch => {
    dispatch(showLoading())
    return deletePostAPI(postId).then((post) => {
      dispatch({
        type: DELETE_POST,
        post,
      })     
    }).then(dispatch(hideLoading()))
}
