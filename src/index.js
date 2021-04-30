import React from 'react'

import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';

import App from './App.jsx'
import todoApp from './reducers/reducers.js'
import reportWebVitals from './reportWebVitals';

let store = createStore(todoApp)
let rootElement = document.getElementById('root')

render(
   <Provider store = {store}>
      <App />
   </Provider>,
	
   rootElement
)

reportWebVitals();