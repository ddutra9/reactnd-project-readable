import {getCategoriesAPI} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const handleGetCategories = () => dispatch => {
    dispatch(showLoading())
    return getCategoriesAPI().then((categories) => {
      dispatch({
        type: GET_CATEGORIES,
        categories,
      })
      dispatch(hideLoading())
    })
}

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}