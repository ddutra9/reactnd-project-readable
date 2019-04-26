import React from 'react'
import { Form } from 'semantic-ui-react'

const sortList = [
    { id:'timestampAsc', label: 'Mais recentes', field: 'timestamp' },
    { id:'timestampDesc', label: 'Menos recentes', field: 'timestamp' },
    { id:'voteScoreAsc', label: 'Mais likes', field: 'voteScore' },
    { id:'voteScoreDesc', label: 'Menos likes', field: 'voteScore' },
]

const SortBy = ({selected, onChange}) => {

    const handleSort = (e, { value }) => {
        let values = sortList.filter(v => {
            return v.id === value 
        })

        if(values && values.length > 0){
            values = values[0]
        }

        onChange(values)
    }

    return (
        <Form>
            <Form.Group grouped>
                {sortList.map((value) => {
                    return (
                        <Form.Radio
                            key={value.id}
                            checked={value.id === selected}
                            label={value.label}
                            name="sort"
                            type="radio"
                            value={value.id}
                            onChange={handleSort}
                        />
                    )
                })}
            </Form.Group>
        </Form>
    )
}

export default SortBy