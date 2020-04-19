import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class StreamDataService {

  constructor(private socket: Socket) {
    // this.connect()
  }

  connect() {
    return this.socket.connect();
  }

  disconnect() {
    return this.socket.disconnect();
  }

  sendData(chanel:string,msg:any) {
    return this.socket.emit(chanel, msg);
  }

  getData(chanel:string) {
    return this.socket.fromEvent(chanel)
  }

}
