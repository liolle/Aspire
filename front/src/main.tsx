import React from 'react'
import ReactDOM from 'react-dom'
// import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.js'
import './index.css'

import store from './app/store'
import { Provider } from 'react-redux'

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  

//   <HashRouter>
//      <ChakraProvider>
//         <Provider store={store}>
//           <App />
//         </Provider>
//     </ChakraProvider>
//   </HashRouter>,
// )

ReactDOM.render(
  <HashRouter>
     <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </ChakraProvider>
  </HashRouter>,
  document.getElementById("root")
)

