import React from 'react'
import { Form } from 'semantic-ui-react'

const Filter = ({categories, selected, onChange}) => {
    return (
        <Form>
            <Form.Group grouped>
                <Form.Radio
                        key="all"
                        checked={selected === 'all'}
                        label="All"
                        name="category"
                        type="radio"
                        value="all"
                        onChange={onChange}
                    />
                {categories.map(category => (
                    <Form.Radio
                        key={category.name}
                        checked={selected === category.name}
                        label={category.name}
                        name="category"
                        type="radio"
                        value={category.path}
                        onChange={onChange}
                    />
                ))}
            </Form.Group>
        </Form>
    )
}

export default Filter