import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatTRService {

  socket: any;
  private url: string = 'https://demare-nueva_apiclinica.mdbgo.io:3000';

  constructor() {
    this.socket = io(this.url);
  }

  listen(eventName: string){
    return new Observable((subscriber: { next: (arg0: any) => void; }) => {
      this.socket.on(eventName,(data: any) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }


}
