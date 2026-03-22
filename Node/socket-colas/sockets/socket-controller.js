/* eslint-disable n/no-callback-literal */
import { TicketControl } from '../models/ticket-control.js'

const ticketControl = new TicketControl()

export const socketController = (socket) => {
  // --- Eventos cuando un cliente se conecta ---
  // Enviar el ultimo valor
  socket.emit('ultimo-ticket', ticketControl.ultimo)

  socket.emit('estado-actual', ticketControl.ultimosCuatro)
  // Cuantos tickets nos quedan
  socket.emit('cola-tickets', ticketControl.tickets.length)

  // Socket de Cuando se agrega uno nuevo
  socket.on('siguiente-ticket', (payload, callback) => {
    const siguiente = ticketControl.siguiente()
    callback(siguiente)

    socket.broadcast.emit('cola-tickets', ticketControl.tickets.length)
  })

  // Socket cuando se atiende uno nuevo
  socket.on('atender-ticket', ({ escritorio }, callback) => {
    if (!escritorio) return callback({ ok: false, msg: 'El escritorio es obligatorio' })

    const ticket = ticketControl.atenderTicket(escritorio)

    // Notificar cambio en los ultimos 4
    socket.broadcast.emit('estado-actual', ticketControl.ultimosCuatro)

    // Cambio en en el total de los valores
    socket.emit('cola-tickets', ticketControl.tickets.length)
    socket.broadcast.emit('cola-tickets', ticketControl.tickets.length)

    if (!ticket) callback({ ok: false, msg: 'Ya no hay ticket pendiente' })
    else callback({ ok: true, ticket })
  })
}
