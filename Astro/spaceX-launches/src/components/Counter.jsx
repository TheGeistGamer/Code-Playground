import { useState } from "react"

export const Counter = () => {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <button className="border px-4 py-2 text-xl" onClick={() => setCounter(counter - 1)}>-</button>
        <span className="text-yellow-300 m-4 text-xl">{counter}</span>
      <button className="border px-4 py-2 text-xl"  onClick={() => setCounter(counter + 1)}>+</button>
    </>
  )
}
