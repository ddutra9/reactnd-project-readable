import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Icon } from 'semantic-ui-react'
import { handleVoteOnPost } from '../actions/posts'
import CommentList from '../../components/comments/CommentList'
import { handleComments } from '../actions/comments'

class PostView extends Component {

    getCurrentPost = (posts, postId) => {
        return posts.filter(p => p.id === postId)[0]
    }  

    componentDidMount() {
        const post = this.getCurrentPost(this.props.posts, this.props.match.params.post_id)
        this.setState({post : post});
        getCommentsByPost(post.id)
    }

    savePost = () => {
        this.props.savePost({...this.props.post, title: 'Updated in...' + (Math.random(100) * 100)})
    }

    handleLike = () => {
        likeUnlike(post.id, true)
    }

    handleUnLike = () => {
        likeUnlike(post.id, false)
    }

    gotoBack = () => {
        this.props.history.goBack()
    }

    renderPost = () => {
        const {post} = this.state

        return (
            <div>
                <Container>
                    <div className="pull-right">
                        <Button basic onClick={this.gotoBack}>Back</Button>
                    </div>

                    <div>
                        <div>{post.author}</div>
                        <div>{post.body.split('\n').map((text, index) => (
                            <p key={index}>{text}</p>)
                        )}</div>
                    </div>
                </Container>

                <div>
                    <Container>
                        <div>
                            <span>Did you like this post?</span>
                            <div>
                                <Button onClick={this.handleLike}>
                                    <Icon name="thumbs up" />
                                </Button>
                                <span />
                                <Button onClick={this.handleUnLike}>
                                    <Icon name="thumbs down" />
                                </Button>
                            </div>
                            <span className="votes">{post.votes}</span>
                        </div>
                    </Container>
                </div>

                <CommentList postId={post.id} />
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderPost()}
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
        likeUnlike: (postId, isLike) => dispatch(handleVoteOnPost(postId, isLike)),
        getCommentsByPost: (postId) => dispatch(handleComments(postId))
    }
}

export default withRouter(connect(mapState, mapDispatch)(PostView))