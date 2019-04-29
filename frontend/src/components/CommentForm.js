import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import actions from '../../actions'

const CommentForm = (props) => {
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, onCancel, initialValues} = props
    const hasError = (field) => touched[field] && errors[field] ? true : false

    const updateStatus = initialValues.hasOwnProperty('created_at')

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field error={hasError('author')}>
                <label>Your Full Name</label>
                <input
                    type="text" name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                />
                {hasError('author') && <ErrorMessage msg={errors.author} />}
            </Form.Field>

            <Form.Field error={hasError('comment')}>
                <label>Your Comment</label>
                <textarea
                    name="comment" rows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                ></textarea>
                {hasError('comment') && <ErrorMessage msg={errors.comment} />}
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