import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './store/configureStore'

const store = configureStore()

render(
	<Provider store={store}>
	    <div className='app'>
	      	<App />
	    </div>
	</Provider>,
  document.getElementById('root')
)