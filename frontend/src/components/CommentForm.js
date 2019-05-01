import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

class CommentForm extends Component {

    state = {
        isSubmitting: false,
        id: this.props.comment ? this.props.comment.id : undefined,
        parentId: this.props.postId,
        body: this.props.comment? this.props.comment.body : undefined,
        author: this.props.comment? this.props.comment.author : undefined,
    }
   
    handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        this.setState({isSubmitting: true})
        const {author, body, parentId, id} = this.state
        this.props.onSubmit(id, parentId, body, author)
        this.setState({author: '', body: ''})
    }

    render() {
        const { handleChange, isSubmitting, onCancel, comment} = this.props
        const {author, body} = this.state

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field >
                    <label>Author</label>
                    <input
                        type="text" name="author"
                        disabled={this.props.comment}
                        onChange={handleChange}
                        value={author}
                    />
                </Form.Field>
    
                <Form.Field >
                    <label>Your Comment</label>
                    <textarea
                        name="body" rows={3}
                        onChange={handleChange}
                        value={body}
                    ></textarea>
                </Form.Field>
    
                <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    { comment ? 'Save' : 'Add'}
                </Button>
    
                {comment && (
                    <Button basic type="button" disabled={isSubmitting} onClick={() => onCancel()}>
                        Cancel
                    </Button>
                )}
    
            </Form>
        )
    }
    
}

export default connect()(CommentForm)