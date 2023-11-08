import {Util} from '../../../shared/utils/utils';

export interface Chat {
  sender: string;
  receiver: string;
  content: string;
  image: string;
  fechaHora: string;

  // tslint:disable-next-line:no-misused-new
  new(parameters?: any): Chat;
}

export class Chat {
  constructor(parameters?: any) {
    Util.createInstanceWithParameters(this, parameters);
  }

  convertChat() {
    return {
      sender: this.sender ? this.sender : null,
      receiver: this.receiver ? this.receiver : null,
      content: this.content ? this.content : null,
      image: this.image ? this.image : null,
      fechaHora: this.fechaHora ? this.fechaHora : null
    };
  }
}
