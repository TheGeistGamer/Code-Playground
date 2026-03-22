import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.FRONT_TOKEN_STRIPE);

export const Aplicacion = () => {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [])

  const appearance = {
    theme: 'night'
  };

  const options = {
    clientSecret,
    appearance
  }

  return (
    <div className="App">
      {
        clientSecret && (
          <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
          </Elements>
      )}
    </div>
  ) 
}