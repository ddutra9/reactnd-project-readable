import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { handleAddPosts } from '../../actions/posts'
import {withRouter} from 'react-router-dom'

class PostForm extends Component {

    state = {
        isSubmitting: false,
        id: this.props.post ? this.props.post.id : undefined,
        title: this.props.post? this.props.post.title : undefined,
        category: this.props.post? this.props.post.category : undefined,
        body: this.props.post?this.props.post.body : undefined,
        author: this.props.post ? this.props.post.author : undefined,
    }

    onChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { title, body, category, author, id } = this.state
        this.props.onSubmit(title, body, category, author, id)
    }
    
    render() {
        const { categories, onCancel, post } = this.props
        const { isSubmitting, title, body, category, author } = this.state

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Field width={10}>
                        <label>Title</label>
                        <input
                            type="text" name="title"
                            onChange={this.onChange}
                            value={title}
                        />
                    </Form.Field>
    
                    <Form.Field width={6}>
                        <label>Category</label>
                        <select
                            name="category"
                            onChange={this.onChange}
                            disabled={post}
                            value={category}
                        >
                            <option value=""></option>
                            {categories.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </Form.Field>
                </Form.Group>
    
                <Form.Field>
                    <label>Body</label>
                    <textarea
                        name="body" rows={12}
                        onChange={this.onChange}
                        value={body}
                    ></textarea>
                </Form.Field>
    
                <Form.Field>
                    <label>Author</label>
                    <input
                        type="text" name="author"
                        onChange={this.onChange}
                        disabled={post}
                        value={author}
                    />
                </Form.Field>
    
                <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    { post ? 'Save' : 'Add'}
                </Button>
                <Button basic type="button" disabled={isSubmitting} onClick={() => onCancel()}>
                    Cancel
                </Button>
            </Form>
        )
    }
    
}

const mapState = (state, props) => {
    return {
        categories: state.categories,
    }
}

const mapDispatch = (dispatch) => {
    return {
        savePost: (post) => dispatch(handleAddPosts(post))
    }
}

export default withRouter(connect(mapState, mapDispatch)(PostForm))