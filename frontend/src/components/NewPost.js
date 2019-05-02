import React, {Component} from 'react'
import {addPost} from '../actions/posts'
import {addPostAPI} from '../utils/api'
import {connect} from 'react-redux'
import PostForm from './PostForm'
import Nav from './Nav'

class NewPost extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({title, body, author, category}) {
    const {postAdded, history: {push} } = this.props

    if (title && body && author && category) {
      addPostAPI(title, body, author, category).then((post) => {
        addPost(post)

      })
    }
  }

  render() {
    const {categories, match} = this.props
    return (
      <div>
        <Nav url={match && match.url}/>
        <PostForm categories={categories} submitBtnText='Publish' onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

function mapStateToProps({categories}) {
  return {categories}
}

export default connect(mapStateToProps, postActions)(NewPost)
