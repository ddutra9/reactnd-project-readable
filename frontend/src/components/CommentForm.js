import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import actions from '../../actions'

const CommentForm = (props) => {
    const { handleChange, isSubmitting, onCancel} = props

    const onSubmit = (e) => {
        isSubmitting = true
        props.handleSubmit()
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field >
                <label>Your Full Name</label>
                <input
                    type="text" name="author"
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

const mapDispatch = (dispatch) => {
    return {
        saveComment: (comment) => dispatch(actions.comments.saveComment(comment))
    }
}

export default connect(null, mapDispatch)(CommentForm)