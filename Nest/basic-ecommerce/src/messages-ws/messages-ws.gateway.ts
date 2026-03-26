import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './Dtos/new-message.dto';
import { JwtPayload } from 'src/auth/interface';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization as string
    let payload: JwtPayload
    try {
      payload = this.jwtService.verify(token)
      await this.messagesWsService.registerClient(client, payload.id)
    } catch (error) {
      client.disconnect()   
    }
  
    this.wss.emit('clients-updates', this.messagesWsService.getConnectedClients())
  }
    
  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id)
    this.wss.emit('clients-updates', this.messagesWsService.getConnectedClients())
  }

  // message-from-client
  @SubscribeMessage('message-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {

    // Emite unicamente al cliente
    // client.emit('message-from-server', { fullname: 'Soy yo', message: payload.message || 'Sin mensaje'})

    // Emite a todos los clientes, menos al que envio el mensaje
    // client.broadcast.emit('message-from-server', { fullname: 'Hola a todos', message: payload.message || 'Sin mensajes' })

    // Enviar a todos
    this.wss.emit('message-from-server', { 
      fullname: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'Sin mensajes'
    })
  }
}
