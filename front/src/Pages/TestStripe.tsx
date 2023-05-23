import {Elements, PaymentElement, AddressElement, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { FormEvent, useEffect, useState } from 'react';
import CheckoutForm from '../Components/stripe/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.


export default function StripePage() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  const stripe = useStripe()

  useEffect(()=>{
    const appearance = {
        theme: 'stripe',
      
        variables: {
          colorPrimary: '#0570de',
          colorBackground: '#ffffff',
          colorText: '#30313d',
          colorDanger: '#df1b41',
          fontFamily: 'Ideal Sans, system-ui, sans-serif',
          spacingUnit: '2px',
          borderRadius: '4px',
          // See all possible variables below
        }
      };
      
      // Pass the appearance object to the Elements instance
  })

  return (
    <div className=' flex justify-center items-center bg-wht w-[500px] h-[500px]'>
        <PaymentElement />
    </div>
  );
};

const PaymentForm = ()=>{

    const element = useElements()
    const stripe = useStripe()


    const handleSubmit = (e:FormEvent)=>{
        e.preventDefault()

        if (! element || ! stripe){
            return
        }

        // const card = element.getElement(CardElement)
        // console.log(card);
        // console.log(stripe);
        
        

    }

    return (
        <form onSubmit={handleSubmit} 
        className=' flex flex-1 flex-col gap-2 p-2 '>
            <CardElement  />
            <div className='flex justify-center'>

                <button className=' border-2 w-fit px-4 py-2'>Pay</button>
            </div>
        </form>
        
      );
}

