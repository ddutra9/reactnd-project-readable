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
                        key={category.id}
                        checked={selected === category.id}
                        label={category.label}
                        name="category"
                        type="radio"
                        value={category.id}
                        onChange={onChange}
                    />
                ))}
            </Form.Group>
        </Form>
    )
}

export default Filter