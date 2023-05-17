import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.js'
import './index.css'

import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  

  <BrowserRouter>
     <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </ChakraProvider>
  </BrowserRouter>,
)



