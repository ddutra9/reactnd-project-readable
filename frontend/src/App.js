import React, { Component, Fragment } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'
import Page404 from './components/Page404'
import Header from './components/header'
import { createBrowserHistory } from 'history';
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

export default App
