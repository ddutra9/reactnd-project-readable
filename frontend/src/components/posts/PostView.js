import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Icon } from 'semantic-ui-react'
import { handleVoteOnPost, handleDeletePost } from '../../actions/posts'
import CommentList from '../comments/CommentList'
import { handleComments } from '../../actions/comments'
import {withRouter} from 'react-router-dom'

const likeButton = {
    padding: '10px 6px 10px 12px',
    margin: '0',
    height: '100%',
    borderRadius: '0',
    boxShadow: 'none',
    backgroundColor: 'white'
}

const divVote = {
    background: 'rgb(239, 239, 239)',
    padding: '20px 0',
    maginTOp: '30ṕx'
}

const divRoot = {
    marginBottom: '-30px'
}

class PostView extends Component {

    constructor(props) {
        super(props);
        if(this.props.post){
            this.props.getCommentsByPost(this.props.post.id)
        } else{
            this.props.history.push(`/404`)
        }
    }

    onLike = () => {
        const postId = this.props.match.params.post_id
        this.props.likeUnlike(postId, true)
    }

    onUnLike = () => {
        const postId = this.props.match.params.post_id
        this.props.likeUnlike(postId, false)
    }

    onBack = () => {
        this.props.history.goBack()
    }

    onEditPost = () => {
        const postId = this.props.match.params.post_id
        const category = this.props.match.params.category
        this.props.history.push(`/${category}/${postId}/edit`)
    }

    onDeletePost = () => {
        const postId = this.props.match.params.post_id
        this.props.deletePost(postId)
        this.props.history.goBack()
    }

    renderPost(post) {
        return (
            <div style={divRoot}>
                <Container>
                    <div className="pull-right">
                        <Button basic onClick={this.onBack}>Back</Button>
                    </div>

                    <div className="ui raised very padded text container segment">
                        <h2 className="ui header">{post.title}</h2>
                        <p>Category: {post.category}, by {post.author}, {post.date}</p>
                        <p>{post.body}</p>
                        <div style={divVote}>
                            <Container>
                                <span>Você gostou deste post?</span>
                                <div>
                                    <Button style={likeButton} onClick={this.onLike}>
                                        <Icon name="thumbs up" />
                                    </Button>
                                    <span />
                                    <Button style={likeButton} onClick={this.onUnLike}>
                                        <Icon name="thumbs down" />
                                    </Button>
                                    <span className="votes"> {post.voteScore}</span>
                                </div>
                                <div>
                                    <Button onClick={this.onEditPost}>edit</Button>
                                    <Button onClick={this.onDeletePost}>remove</Button>
                                </div>
                            </Container>
                        </div>
                    </div>
                </Container>

                <CommentList postId={post.id} />
            </div>
        )
    }

    render() {
        const {post} = this.props

        return (
            <div>
                {post ? this.renderPost(post) : null}
            </div>
        )
    }
}

const getCurrentPost = (posts, postId) => {
    return posts.filter(p => p.id === postId)[0]
}  

const mapState = (state, props) => {
    return {
        posts: state.posts,
        post: getCurrentPost(state.posts, props.match.params.post_id),
    }
}

const mapDispatch = (dispatch) => {
    return {
        likeUnlike: (postId, isLike) => dispatch(handleVoteOnPost(postId, isLike)),
        getCommentsByPost: (postId) => dispatch(handleComments(postId)),
        deletePost: (postId) => dispatch(handleDeletePost(postId)),
    }
}

export default withRouter(connect(mapState, mapDispatch)(PostView))