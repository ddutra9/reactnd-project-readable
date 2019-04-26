import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import Page404 from './components/Page404'
import Header from './components/header'
import { createBrowserHistory } from 'history';
import LoadingBar from 'react-redux-loading'
import Posts from './components/Posts'

const divMain = {
  paddingTop: '15px'
};

const routes = [
  { path: "/", component: Posts },
];

class App extends Component {

    render() {
      return (
        <Router history={createBrowserHistory()}>
          <Fragment>
            <LoadingBar />
            <div>
              <Header />
              <div style={divMain}>
                <Switch>
                  {routes.map(route => <Route key={ route.path } { ...route } />)}
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

export default connect(mapState, null)(App)