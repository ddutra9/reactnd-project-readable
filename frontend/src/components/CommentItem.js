import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Container } from 'semantic-ui-react'
import {handleVoteOnComment, handleDeleteComment, handleUpdateComment} from '../actions/comments'
import CommentForm from './CommentForm'

class CommentItem extends Component {

    state = {
        status: 'view'
    }

    onUpdateStatus = (status) => {
        this.setState({status})
    }

    onDelete = () => {
        this.onUpdateStatus('saveOrDelete')
        this.props.deleteComment(this.props.data.id)
    }

    onLike = () => {
        this.props.likeOrUnlike(this.props.data.id, true)
    }

    onUnlike = () => {
        this.props.likeOrUnlike(this.props.data.id, false)
    }

    onSubmit = (id, parentId, body, author) => {
        this.onUpdateStatus('saveOrDelete')
        this.props.updateComment(id, body).then(response => {
                this.handleChangeMode('view')
            })
    }

    onCancel = () => {
        this.setState({mode:'view'})
    }

    render() {
        const comment = this.props.data

        return (
            <Container>

                {this.state.status === 'view' && (
                    <div class="item">
                        <div class="middle aligned content">
                            <div class="header">
                                {comment.author}, {comment.date}
                            </div>
                            <div class="description">
                                <p>{comment.comment}</p>
                            </div>
                            <div class="extra">
                                <button class="mini ui button" onClick={this.onUpdateStatus('edit')}>
                                    <Icon size="mini" name="edit" />
                                </button>
                                <button class="mini ui button" onClick={this.onDelete()}>
                                    <Icon size="mini" name="delete" />
                                </button>
                                <div class="ui labeled button" tabindex="0">
                                    <div class="ui button" onClick={this.onLike}>
                                        <i size="mini" name="thumbs up"></i> 
                                    </div>
                                    <div class="ui button" onClick={this.onUnlike}>
                                        <i size="mini" name="thumbs down"></i>
                                    </div>
                                    <a class="ui basic red left pointing label">
                                        {comment.votes}
                                    </a>
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
                    <div class="ui segment">
                        <p></p>
                        <div class="ui active dimmer">
                            <div class="ui loader"></div>
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