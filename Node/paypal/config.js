import { config } from 'dotenv'
config()

export const PORT = process.env.PORT ?? 3000
export const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_KEY
export const PAYPAL_SECRET = process.env.PAYPAL_SECRET_KEY
export const PAYPAL_URL = 'https://api-m.sandbox.paypal.com'
export const HOST = `http://localhost:${PORT}`
