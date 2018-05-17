import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';


import { Provider } from 'react-redux'
import configureStore from './redux/stores/configureStore'

class App extends React.Component {
    render(){
    const {history,routes, store} = this.props


      return (
        <Provider store={store}>
            <Router history={history} children={routes} />
        </Provider>
      )
    }
}

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app')



let render = () => {
    const routes = require('./routes').default()
  ReactDOM.render(

      <App store={store} history={history} routes = {routes}/>,
    MOUNT_NODE
  )
}


// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}else{
  console.log("开发状态！");
}


render()
