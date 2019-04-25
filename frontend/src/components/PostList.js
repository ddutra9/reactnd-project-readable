import React from 'react'
import { Grid, Card, Button } from 'semantic-ui-react'

const PostList = ({ post, deletePost, votePost }) => {

    return (
        <Grid.Column width={8}>
            <Card fluid>
                <Card.Content>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Meta>Category: {post.category}, by {post.author}, {post.date}</Card.Meta>
                    <Card.Description>{post.body}</Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default PostList