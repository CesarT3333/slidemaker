import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

import { EventProgressPresentationEnum } from '@model/enum/event-progress-presentation.enum';
import User from '@model/user';

@WebSocketGateway(4000, { namespace: '/presentation' })
export class PresentationProgressGateway
  implements OnGatewayConnection, OnGatewayDisconnect {

  private _clients: Array<any> = [];

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: any) {
    this._clients = this._clients
      .filter(c => `${c.handshake.query.token}` === `${client.handshake.query.token}`);
  }

  emitProgressToClient(user: User, progress: EventProgressPresentationEnum): void {
    const client = this._clients
      .find(c => `${c.handshake.query.token}` === `${user.authorizationToken}`);

    if (client) {
      client.emit('presentationProgress', { progress });
    }
  }

  handleConnection(client: any, ..._: any[]) {

    if (client?.handshake?.query?.token &&
      !this._clients.find(c => `${c.handshake.query.token}` === `${client.handshake.query.token}`)
    ) { this._clients.push(client); }

  }
}
