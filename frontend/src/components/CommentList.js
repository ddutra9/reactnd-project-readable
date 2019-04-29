import React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const CommentList = (props) => {

    const comments = props.comments

    const renderItems = () => {
        return comments.map(comment => (
            <CommentItem key={comment.id} data={comment} postId={props.postId} />
        ))
    }

    return (
        <WrapperComments>
            <Container>
                <h3>Comments <small>(total: { comments.length })</ small></h3>
                {comments.length > 0 ? renderItems() : "Be the first to write a comment"}

                <hr className="divider" />

                <h3>Leave a Comment</h3>
                <CommentForm className="comment-form" postId={props.postId}/>
            </Container>
        </WrapperComments>
    )
}

const mapState = (state, props) => {
    return {
        comments: state.comments
    }
}

export default connect(mapState)(CommentList)