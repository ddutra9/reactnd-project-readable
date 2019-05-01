import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { handleAddComments } from '../actions/comments'
import CommentForm from './CommentForm'


const CommentList = (props) => {

    const comments = props.comments

    // const renderItems = () => {
    //     return comments.map(comment => (
    //         <CommentItem key={comment.id} data={comment} postId={props.postId} />
    //     ))
    // }

    const onSubmit = (id, parentId, body, author) => {
        props.addComment(parentId, body, author)
    }

    return (
        <Container>
            <h3>Comments: {comments.length}</h3>
            {/* {comments.length > 0 ? renderItems() : "Be the first to write a comment"} */}

            <hr className="divider" />

            <h3>Leave a Comment</h3>
            <CommentForm className="comment-form" 
                postId={props.postId} onSubmit={onSubmit} />
        </Container>
    )
}

const mapState = (state, props) => {
    return {
        comments: state.comments
    }
}

const mapDispatch = (dispatch) => {
    return {
        addComment: (parentId, body, author) => dispatch(handleAddComments(parentId, body, author)),
    }
}

export default connect(mapState, mapDispatch)(CommentList)