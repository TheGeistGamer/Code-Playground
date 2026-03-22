/* eslint-disable no-return-assign */
// Referencias HTML
const titulo = document.getElementById('titulo')
const btnAtender = document.getElementById('btnAtender')
const showTicket = document.getElementById('showTicket')
const alertaTicket = document.getElementById('alertaTicket')

const lblPendientes = document.getElementById('lblPendientes')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('El escritorio es obligatorio')
}

// Obtener el escritorio actual de la URL
const escritorio = searchParams.get('escritorio')
titulo.innerHTML = escritorio

alertaTicket.style.display = 'none'

const socket = io()

socket.on('connect', () => {
  btnAtender.style.display = ''
})

socket.on('disconnect', () => {
  btnAtender.style.display = 'none'
})

btnAtender.addEventListener('click', () => {
  socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
    if (!ok) {
      showTicket.innerText = 'Nadie'
      return alertaTicket.style.display = ''
    }

    showTicket.innerText = 'Ticket: ' + ticket.numero
  })
})

socket.on('cola-tickets', (payload) => {
  lblPendientes.innerText = payload
})
