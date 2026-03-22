import { paymentsRouter } from './routes/payment.routes.js'
import express, { json } from 'express'
import { PORT } from './config.js'
const app = express()

app.use(json())

app.use('/', paymentsRouter)

app.listen(PORT, () => {
  console.log(`server is on port: http://localhost:${PORT}`)
})
