const api = "http://localhost:3001"

const getAuthHeaders = () => {
  const headers = new Headers();
  headers.append('Authorization', 'whatever-you-want')
  headers.append('Content-Type', 'application/json')
  return headers
};


export const getAllPostsAPI = () =>
  fetch(`${api}/posts`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
    .then(res => res.json())
    .then(data => data)

export const getCommentsForPostAPI = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, getAuthHeaders())
    .then(res => res.json())
    .then(data => data)

export const getCategoriesAPI = () =>
  fetch(`${api}/categories`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPostsInCategoryAPI = (category) =>
  fetch(`${api}/${category}/posts`, {
    method: 'GET',
    headers: getAuthHeaders()
  })
    .then(res => res.json())
    .then(data => data)

export const addPostAPI = (data) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: data.id,
      timestamp: Date.now(),
      title: data.title,
      author: data.author,
      body: data.body,
      category: data.category,
      voteScore: 0,
      deleted: false
    })
  }).then(res => res.json())

export const editPostAPI = (data) =>
  fetch(`${api}/posts/${data.postId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ 
      title: data.title, 
      body: data.body
    })
  }).then(res => res.json())

export const deletePostAPI = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  }).then(res => res.json())
  .then(data => data)

export const voteOnPostAPI = (postId, isLiked) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      'option': isLiked? 'upVote' : 'downVote'
    })
  }).then(res => res.json())

export const addCommentAPI = (data) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id: data.id,
      body: data.body,
      author: data.author,
      parentId: data.parentId,
      timestamp: data.timestamp,
      voteScore: 0
    })
  }).then(res => res.json())

export const editCommentAPI = (commentId, body) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      timestamp: Date.now(),
      body: body
    })
  }).then(res => res.json())

export const deleteCommentAPI = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  }).then(res => res.json())

export const voteOnCommentAPI = (commentId, isLiked) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ option: isLiked? 'upVote' : 'downVote'})
  }).then(res => res.json())
