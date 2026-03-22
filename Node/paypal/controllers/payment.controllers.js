/* eslint-disable camelcase */
import { HOST, PAYPAL_CLIENT, PAYPAL_SECRET, PAYPAL_URL } from '../config.js'
import axios from 'axios'

export class PaymentControllers {
  static accessToken = ''

  static crearOrder = async (req, res) => {
    try {
      const order = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '105.70'
            }
          }
        ],
        application_context: {
          brand_name: 'mycompany.com',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${HOST}/capture-order`,
          cancel_url: `${HOST}/cancel-payment`
        }
      }

      // format the body
      const params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')

      // Generate an access token
      const { data: { access_token } } = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: PAYPAL_CLIENT,
            password: PAYPAL_SECRET
          }
        }
      )

      this.accessToken = `Bearer ${access_token}`

      // make a request
      const response = await axios.post(`${PAYPAL_URL}/v2/checkout/orders`, order, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
      )

      return res.json(response.data)
    } catch (error) {
      return res.status(500).json('Something goes wrong')
    }
  }

  static captureOrder = async (req, res) => {
    try {
      const { token } = req.query

      await axios.post(`${PAYPAL_CLIENT}/v2/checkout/orders/${token}/capture`, {}, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: this.accessToken
        },
        auth: {
          username: PAYPAL_CLIENT,
          password: PAYPAL_SECRET
        }
      }
      )

      res.redirect()
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'InternalServererror' })
    }
  }

  static CancelOrder = (req, res) => {
    res.send('Order creada')
  }
}
