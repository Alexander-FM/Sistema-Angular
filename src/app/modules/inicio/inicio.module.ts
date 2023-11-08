import { NgModule } from '@angular/core';
import { InicioMainComponent } from './inicio-main/inicio-main.component';
import { InicioRoutingModule } from './inicio-routing.module';
import {DialogModule} from 'primeng-lts/dialog';
import {SharedModule} from '../../shared/shared.module';
import {WebSocket} from '../../shared/services/webSocket';
import {MessageService} from 'primeng-lts/api';
import {ChatWebSocket} from '../../shared/services/chatWebSocket';

@NgModule({
  declarations: [
    InicioMainComponent
  ],
  providers: [
    WebSocket,
    ChatWebSocket,
    MessageService
  ],
  imports: [
    InicioRoutingModule,
    SharedModule,
    DialogModule
  ]
})
export class InicioModule { }
