import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import PostForm from './PostForm'
import {withRouter} from 'react-router-dom'
import {handleUpdatePosts} from '../../actions/posts'

class PostEdit extends Component {
    state = {
        post: undefined
    }

    getCurrentPost = () => {
        return this.props.posts.filter(p => p.id === this.props.match.params.post_id)[0]
    }    

    componentDidMount() {
        this.setState({post : this.getCurrentPost()});
    }

    onCancel = () => {
        this.props.history.goBack()
    }

    onSubmit = (title, body, category, author, id) => {
        this.props.updatePost(id, title, body)
        this.props.history.goBack()
    }

    renderPost() {
        const { post } = this.state
        return (
            <Container>
                <PostForm
                    enableReinitialize
                    post={post}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </Container>
        )
    }

    renderLoading() {
        return (
            <div class="ui segment">
                <p></p>
                <div class="ui active dimmer">
                    <div class="ui loader"></div>
                </div>
            </div>
        )
    }

    render() {
        const { post } = this.state
        return (
            <div>
                {post ? this.renderPost() : this.renderLoading()}
            </div>
        )
    }
}

const mapState = (state, props) => {
    return {
        posts: state.posts
    }
}

const mapDispatch = (dispatch) => {
    return {
        updatePost: (title, body, id) => dispatch(handleUpdatePosts(title, body, id))
    }
}

export default withRouter(connect(mapState, mapDispatch)(PostEdit))