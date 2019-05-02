import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Page404 from './components/Page404'
import Header from './components/header'
import LoadingBar from 'react-redux-loading'
import Posts from './components/Posts'
import PostEdit from './components/posts/PostEdit'
import PostView from './components/posts/PostView'
import PostCreate from './components/posts/PostCreate'

const divMain = {
  paddingTop: '15px'
};

class App extends Component {

    render() {
      return (
        <Router>
          <Fragment>
            <LoadingBar />
            <div>
              <Header />
              <div style={divMain}>
                <Switch>
                  <Route path='/' exact component={Posts} />
                  <Route path='/posts/:post_id/edit' component={PostEdit} />
                  <Route path='/posts/:post_id/view' component={PostView} />
                  <Route path='/new-post' component={PostCreate} />
                  <Route component={Page404} />
                </Switch>
              </div>
            </div>
          </Fragment>
        </Router>
      )
    }
}

const mapState = (state) => ({
  status: state.status
})

export default connect(mapState)(App)