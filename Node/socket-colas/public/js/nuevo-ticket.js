// Referencias HTML
const lblNuevoTicket = document.getElementById('lblNuevoTicket')
const btnNewTicket = document.getElementById('btnNewTicket')

const socket = io()

socket.on('connect', () => {
  btnNewTicket.style.display = ''

  socket.on('ultimo-ticket', (lastvalue) => {
    lblNuevoTicket.innerText = 'ultimo ticket ' + lastvalue
  })
})

socket.on('disconnect', () => {
  btnNewTicket.style.display = 'none'
})

btnNewTicket.addEventListener('click', () => {
  socket.emit('siguiente-ticket', null, (ticket) => {
    lblNuevoTicket.innerText = ticket
  })
})
