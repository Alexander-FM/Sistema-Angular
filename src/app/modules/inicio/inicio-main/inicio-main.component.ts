import {Component, OnInit} from '@angular/core';
import {WebSocket} from '../../../shared/services/webSocket';
import {MessageService} from 'primeng-lts/api';
import {ChatWebSocket} from '../../../shared/services/chatWebSocket';
import {Chat} from '../../../shared/models/chat';

@Component({
  selector: 'app-inicio-main',
  templateUrl: './inicio-main.component.html',
  styleUrls: ['./inicio-main.component.css']
})
export class InicioMainComponent implements OnInit {
  mostrar = false;
  user: string;
  messageAlexander = '';
  messageEmerson = '';
  messageWilson = '';
  messagesForAlexander: Chat[] = [];
  messagesForEmerson: Chat[] = [];
  messagesForWilson: Chat[] = [];

  constructor(protected webSocketService: WebSocket,
              protected chatWebSocketService: ChatWebSocket,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.listeningSocket();
    this.listeningChatSocket();
  }

  listeningSocket() {
    this.webSocketService.connect();
    this.webSocketService.response$.subscribe((data) => {
      console.log('Datos recibidos', data);
      const audio = new Audio('assets/audio/calendar.mp3');
      audio.play().then(r => {
      });
      this.mostrar = true;
      this.user = data.pedido.cliente.nombreCompletoCliente;
      setTimeout(() => {
        this.mostrar = false;
        this.messageService.clear();
      }, 8000);
    });
  }

  listeningChatSocket() {
    this.chatWebSocketService.connect();
    this.chatWebSocketService.response$.subscribe((data: Chat) => {
      console.log('Datos recibidos', data);
      const audio = new Audio('assets/audio/calendar.mp3');
      audio.play().then(r => {
      });
      if (data.sender === 'Alexander Fuentes') {
        this.messagesForEmerson.push(data);
        this.messagesForWilson.push(data);
      } else if (data.sender === 'Emerson Cordova') {
        this.messagesForAlexander.push(data);
        this.messagesForWilson.push(data);
      } else {
        this.messagesForAlexander.push(data);
        this.messagesForEmerson.push(data);
      }
    });
  }

  sendMessageAlexander() {
    const chat = new Chat();
    chat.sender = 'Alexander Fuentes';
    chat.content = this.messageAlexander;
    chat.image = 'assets/images/alexanderProfile.jpg';
    chat.fechaHora = this.formatDateTime(new Date());
    this.messagesForAlexander.push(chat);
    this.chatWebSocketService.sendMessage(chat);
    this.messageAlexander = '';
  }

  sendMessageEmerson() {
    const chat = new Chat();
    chat.sender = 'Emerson Cordova';
    chat.content = this.messageEmerson;
    chat.image = 'assets/images/emersonProfile.jpeg';
    chat.fechaHora = this.formatDateTime(new Date());
    this.messagesForEmerson.push(chat);
    this.chatWebSocketService.sendMessage(chat);
    this.messageEmerson = '';
  }

  sendMessageWilson() {
    const chat = new Chat();
    chat.sender = 'Wilson Hernandez';
    chat.content = this.messageWilson;
    chat.image = 'assets/images/wilsonProfile.jpeg';
    chat.fechaHora = this.formatDateTime(new Date());
    this.messagesForWilson.push(chat);
    this.chatWebSocketService.sendMessage(chat);
    this.messageWilson = '';
  }

  formatDateTime(dateTime) {
    const options = {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true};
    return dateTime.toLocaleDateString('es-ES', options);
  }
}
