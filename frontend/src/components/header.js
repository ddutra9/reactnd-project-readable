import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

const divHeader = {
    backgroundColor: 'gold',
    marginBottom: '30px',
    padding: '30px 0 36px',
};

const divItem = {
    color: 'white !important',
    backgroundColor: 'orangered !important',
    borderBottom: '1px solid rgb(223, 60, 1) !important',
    borderRadius: '4px !important',
}

const menuList = [
    { label: 'Posts', to: '/', activeIn: ['/'] },
    { label: 'New Post', to: '/new-post', activeIn: ['/new-post'] }
]

const items = [
    { key: 'editorials', active: true, name: 'Editorials' },
    { key: 'review', name: 'Reviews' },
    { key: 'events', name: 'Upcoming Events' },
  ]

const Header = (props) => {

    const renderMenu = () => {
        const path = props.location.pathname

        return menuList.map((item, index) => {
            let isActive = false
            const className = ['item']

            if (path === item.activeIn) {
                isActive = true
            }

            if (isActive) className.push('active')

            return (
                <Link
                    key={index}
                    to={item.to}
                    className={className.join(' ')}>
                    {item.label}
                </Link>
            )
        })
    }

    return (
        <div style={divHeader}>
            <Container>
                <Menu items={items}>
                </Menu>
            </Container>
        </div>
    )
}

export default withRouter(Header)