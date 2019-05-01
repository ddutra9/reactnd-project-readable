import React from 'react'
import { connect } from 'react-redux'
import { Grid, Card, Button, Icon } from 'semantic-ui-react'
import { handleVoteOnPost, handleDeletePost } from '../actions/posts'
import {withRouter} from 'react-router-dom'

const PostList = ({ post, deletePost, likeUnlike, history }) => {

    const likeButton = {
        padding: '10px 6px 10px 12px',
        margin: '0',
        height: '100%',
        borderRadius: '0',
        boxShadow: 'none',
        backgroundColor: 'white',
    }

    const handleDeletePost = () => {
        deletePost(post.id)
    }

    const onViewPost = () => {
        history.push(`/posts/${post.id}/view`)
    }

    const handleEditPost = () => {
        history.push(`/posts/${post.id}/edit`)
    }

    const handleLike = () => {
        likeUnlike(post.id, true)
    }

    const handleUnLike = () => {
        likeUnlike(post.id, false)
    }

    return (
        <Grid.Column width={8}>
            <Card>
                <Card.Content>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Meta>Category: {post.category}, by {post.author}, {post.date}</Card.Meta>
                    <Card.Description>{post.body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='comment outline' />
                    {post.commentCount} Comentario(s)
                </Card.Content>
                <Card.Content extra>                
                    <Grid>
                        <Grid.Column width={8}>
                            <Button style={likeButton} onClick={handleLike}><Icon name="thumbs up" /></Button>
                            <Button style={likeButton} onClick={handleUnLike}><Icon name="thumbs down" /></Button>
                            <span>{post.voteScore}</span>
                        </Grid.Column>

                        <Grid.Column width={8} style={{ textAlign: "right" }}>
                            <Button style={likeButton} onClick={onViewPost}>view</Button>
                            <Button style={likeButton} onClick={handleEditPost}>edit</Button>
                            <Button style={likeButton} onClick={handleDeletePost}>remove</Button>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

const mapDispatch = (dispatch) => {
    return {
        deletePost: (postId) => dispatch(handleDeletePost(postId)),
        likeUnlike: (postId, isLike) => dispatch(handleVoteOnPost(postId, isLike))
    }
}

export default withRouter(connect(null, mapDispatch)(PostList))