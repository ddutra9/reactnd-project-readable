import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Page404 from './components/Page404'
import { handleReceivePostsBy, handleSortPost } from './actions/posts'
import Header from './components/header'
import LoadingBar from 'react-redux-loading'
import Posts from './components/posts/Posts'
import PostEdit from './components/posts/PostEdit'
import PostView from './components/posts/PostView'
import PostCreate from './components/posts/PostCreate'

const divMain = {
  paddingTop: '15px'
};

class App extends Component {

    componentDidMount() {
        this.props.getPostsBy()
    }

    render() {
      return (
        <Router>
          <Fragment>
            <LoadingBar />
            <div>
              <Header />
              <div style={divMain}>
                {this.props.posts.length >= 0
                  ? 
                  <Switch>
                    <Route path='/' exact component={Posts} />
                    <Route path='/new-post' component={PostCreate} />
                    <Route path='/:category' exact component={Posts} />
                    <Route path='/:category/:post_id/edit' component={PostEdit} />
                    <Route path='/:category/:post_id/view' component={PostView} />
                    <Route component={Page404} />
                  </Switch>
                  : null
                }
              </div>
            </div>
          </Fragment>
        </Router>
      )
    }
}

const mapState = (state) => ({
  posts: state.posts
})

const mapDispatch = (dispatch) => {
  return {
      getPostsBy: (value) => dispatch(handleReceivePostsBy(value)),
  }
}

export default connect(mapState, mapDispatch)(App)