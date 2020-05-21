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

import User from '@model/user';

@WebSocketGateway(4000, { namespace: '/presentation' })
export class PresentationProgressGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {

  private _clients: Array<any> = [];

  handleDisconnect(client: any) {
    this._clients = this._clients
      .filter(c => `${c.handshake.query.token}` === `${client.handshake.query.token}`);
  }

  afterInit(server: any) { }

  @WebSocketServer()
  server: Server;

  emitProgressToClient(user: User, progressValue: number): void {
    const client = this._clients
      .find(c => `${c.handshake.query.token}` === `${user.authorizationToken}`);

    if (client) {
      client.emit('presentationProgress', { progress: progressValue });
    }
  }

  handleConnection(client: any, ..._: any[]) {

    if (client?.handshake?.query?.token &&
      !this._clients.find(c => `${c.handshake.query.token}` === `${client.handshake.query.token}`)
    ) { this._clients.push(client); }

  }
}

/*
  interface ClientWs {
    handshake: { query: string }
  }
*/
