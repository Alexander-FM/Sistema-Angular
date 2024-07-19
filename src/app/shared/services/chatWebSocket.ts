import {Injectable} from '@angular/core';

declare let SockJS;
declare let Stomp;
import {Subject} from 'rxjs';
import {Chat} from '../models/chat';
import {Categoria} from '../models/categoria';

@Injectable()
export class ChatWebSocket {
  // socket: SockJS
  stompClient: any;
  topic = '/topic/chat';
  private responseSubject = new Subject<any>(); // Utilizado para transmitir los datos recibidos desde el WebSocket a otros componentes.
  public response$ = this.responseSubject.asObservable();

  webSocketEndPoint = 'http://localhost:9090/socket-ecommerce';

  connect() {
    console.log('Chat using web socket in spring boot');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    // tslint:disable-next-line:variable-name
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame: any) {
      that.stompClient.subscribe(that.topic, response => {
        that.onReceived(response);
      });
    });
  }

  errorCallBack(error: any) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disable();
    }
  }

  sendMessage(chat: Chat) {
    const chatJson = JSON.stringify(chat);
    this.stompClient.send('/app/sendMessage', {}, chatJson);
  }

  onReceived(response: any) {
    console.log('Mensaje desde el servidor :: ' + response.body);
    const obj = JSON.parse(response.body);
    this.responseSubject.next(obj);
  }
}
