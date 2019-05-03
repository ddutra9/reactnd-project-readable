import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'

class Header extends Component {
  render() {
    const menuList = [
        { label: 'Posts', to: '/'},
        { label: 'New Post', to: '/new-post' }
    ]

    return (
      <Container>
        <Menu>
          {menuList.map(item => <Menu.Item key={item.label} as={NavLink} exact to={item.to} content={item.label} />)}
        </Menu>
      </Container>
    )
  }
}

export default withRouter(Header)
