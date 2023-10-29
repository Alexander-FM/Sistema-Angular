import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocket} from '../../../shared/services/webSocket';
import {Message, MessageService} from 'primeng-lts/api';

@Component({
  selector: 'app-inicio-main',
  templateUrl: './inicio-main.component.html',
  styleUrls: ['./inicio-main.component.css']
})
export class InicioMainComponent implements OnInit {
  mostrar = false;
  user: string;

  constructor(protected webSocketService: WebSocket, private messageService: MessageService) {
  }

  ngOnInit() {
    this.listeningSocket();
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

  showSuccess() {
    this.messageService.add({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});

  }

}
