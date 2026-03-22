/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img 
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form action="http://localhost:3000/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
)

const Message = ({ message }) => (
  <section>
    <p>{ message }</p>
  </section>
)



function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)

    if (query.get('succes')) {
      setMessage('Order places! You will recive an email confirmation')
    }

    if (query.get('canceled')) {
      setMessage('Order canceled -- continue to shop around and checkout when you are ready')
    }
  }, [])
  
  return message ? (
    <Message message={message}/>
  ) : (
    <ProductDisplay />
  )
}

export default App