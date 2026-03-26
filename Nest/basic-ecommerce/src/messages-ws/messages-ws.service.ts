import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Socket } from 'socket.io';

interface ConnectdClients {
  [id: string]: {
    socket: Socket,
    user: User
  }
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectdClients = {}

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user || !user.isActive) throw new Error('User not found')

    this.checkUserConnected(user)
    
    this.connectedClients[client.id] = {
      socket: client,
      user
    }
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId]
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients)
  }

  getUserFullName(socketId: string) {
    return this.connectedClients[socketId].user.fullname
  }

  private checkUserConnected(user: User) {
    for (const clientId of Object.keys(this.connectedClients)) {
      const connectedClient = this.connectedClients[clientId]
      if (connectedClient.user.id === user.id) {
        connectedClient.socket.disconnect()
        break
      }
    }
  }
}
