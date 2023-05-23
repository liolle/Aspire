import React from 'react'
import ReactDOM from 'react-dom'
// import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.js'
import './index.css'

import store from './app/store'
import { Provider } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

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
     <Elements stripe={loadStripe('pk_test_51NArxSICDGrb7btW86dkBJobCaa28UYiUkOw6GX92aHy5RKUGuv9IdmfLmL7URMXrzWfPJKIgKrDWgwpKedFUzML00feeoAk9m')} >
        <Provider store={store}>
          <App />
        </Provider>
      </Elements>
    </ChakraProvider>
  </HashRouter>,
  document.getElementById("root")
)

