import React from 'react'
import PostForm from './PostForm'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {handleAddPosts} from '../../actions/posts'

const CreatePost = (props) => {

    const onCancel = () => {
        props.history.goBack()
    }

    const onSubmit = (title, body, category, author, id) => {
        console.log(body)
        props.addPost(title, category, body, author)
            .then(() => props.history.goBack())        
    }

    return (
        <Container>
            <PostForm 
                post={undefined}
                onSubmit={onSubmit}
                onCancel={onCancel} />
        </Container>
    )
}

const mapDispatch = (dispatch) => {
    return {
        addPost: (title, category, body, author) => dispatch(handleAddPosts(title, category, body, author))
    }
}

export default withRouter(connect(null, mapDispatch)(CreatePost))
