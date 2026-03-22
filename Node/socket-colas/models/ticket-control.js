/* eslint-disable no-unused-expressions */
// import data from '../db/data.json'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'node:fs'
import data from '../db/data.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class Ticket {
  constructor (numero, escritorio) {
    this.numero = numero
    this.escritorio = escritorio
  }
}

export class TicketControl {
  constructor () {
    this.ultimo = 0
    this.hoy = new Date().getUTCDay()
    this.tickets = []
    this.ultimosCuatro = []

    this.init()
  }

  get toJson () {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimosCuatro: this.ultimosCuatro
    }
  }

  init () {
    const { hoy, tickets, ultimo, ultimosCuatro } = data
    if (hoy === this.hoy) {
      this.tickets = tickets
      this.ultimo = ultimo
      this.ultimosCuatro = ultimosCuatro
    } else {
      this.guardarDB()
    }
  }

  guardarDB () {
    const dbPath = path.join(__dirname, '../db/data.json')
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
  }

  siguiente () {
    this.ultimo += 1

    this.tickets.push(new Ticket(this.ultimo, null))

    this.guardarDB()

    return 'Ticket ' + this.ultimo
  }

  atenderTicket (escritorio) {
    // No tenemos tickets
    if (this.tickets.length === 0) return null

    const ticket = this.tickets.shift()

    ticket.escritorio = escritorio

    this.ultimosCuatro.unshift(ticket)

    if (this.ultimosCuatro.length > 4) {
      this.ultimosCuatro.splice(-1, 1)
    }

    this.guardarDB()

    return ticket
  }
}
