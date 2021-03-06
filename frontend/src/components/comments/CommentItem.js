import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Container } from 'semantic-ui-react'
import {handleVoteOnComment, handleDeleteComment, handleUpdateComment} from '../../actions/comments'
import CommentForm from './CommentForm'

class CommentItem extends Component {

    state = {
        status: 'view'
    }

    onUpdateStatus = (status) => {
        this.setState({status})
    }

    onEdit = () => {
        this.onUpdateStatus('edit')
    }

    onDelete = () => {
        this.onUpdateStatus('saveOrDelete')
        this.props.deleteComment(this.props.comment.id).then(() => this.onUpdateStatus('view'))
    }

    onLike = () => {
        this.props.likeOrUnlike(this.props.comment.id, true)
    }

    onUnlike = () => {
        this.props.likeOrUnlike(this.props.comment.id, false)
    }

    onSubmit = (id, parentId, body, author) => {
        this.onUpdateStatus('saveOrDelete')
        this.props.updateComment(id, body).then(() => this.onUpdateStatus('view'))
    }

    onCancel = () => {
        this.setState({mode:'view'})
    }

    render() {
        const comment = this.props.comment

        return (
            <Container>

                {this.state.status === 'view' && (
                    <div className="ui items">
                        <div className="item">
                            <div className="middle aligned content">
                                <div className="header">
                                    {comment.author}
                                </div>
                                <div className="description">
                                    <p>{comment.body}</p>
                                </div>
                                <div className="extra">
                                    <button className="mini ui button" onClick={this.onEdit}>
                                        <Icon name="edit" />
                                    </button>
                                    <button className="mini ui button" onClick={this.onDelete}>
                                        <Icon name="delete" />
                                    </button>
                                    <button className="mini ui button" onClick={this.onLike}>
                                        <Icon name="thumbs up" />
                                    </button>
                                    <button className="mini ui button" onClick={this.onUnlike}>
                                        <Icon name="thumbs down" />
                                    </button>
                                    {comment.voteScore}                    
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {this.state.status === 'edit' && (
                    <div>
                        <CommentForm
                            className="comment-form"
                            postId={this.props.postId}
                            comment={comment}
                            onSubmit={this.onSubmit}
                            onCancel={this.onCancel}
                        />
                    </div>
                )}

                {this.state.status === 'saveOrDelete' && (
                    <div className="ui segment">
                        <p></p>
                        <div className="ui active dimmer">
                            <div className="ui loader"></div>
                        </div>
                    </div>
                )}

            </Container>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        updateComment: (id, body) => dispatch(handleUpdateComment(id, body)),
        deleteComment: (id) => dispatch(handleDeleteComment(id)),
        likeOrUnlike: (id, isLiked) => dispatch(handleVoteOnComment(id, isLiked)),
    }
}


export default connect(null, mapDispatch)(CommentItem)