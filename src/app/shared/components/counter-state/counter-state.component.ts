import { Component, OnInit } from '@angular/core';
import { StreamDataService } from '../../services/stream-data.service';
import * as moment from "moment";

@Component({
  selector: 'app-counter-state',
  templateUrl: './counter-state.component.html',
  styleUrls: ['./counter-state.component.scss']
})
export class CounterStateComponent implements OnInit {

  empty: number = 0;
  parked: number = 0;
  reserved: number = 0;
  offline: number = 0;

  chanel: string = 'counter';

  counterState: any = { in: 0, out: 0, usePark: 0, noPark: 0 };

  constructor(
    private streamDataService: StreamDataService,
  ) {
    this.joinStream()
  }

  ngOnInit() {
    this.getStream()
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.streamDataService.disconnect()
  }

  joinStream() {
    this.streamDataService.connect();
  }

  closeStream() {
    this.streamDataService.disconnect();
  }

  getStream() {
    console.log("getStream")
    this.streamDataService.getData(this.chanel).subscribe(
      (data: any) => {
        console.log("getData", data)
        if (data) {
          this.counterState = {
            in: data.in, out: data.out, usePark: data.usePark, noPark: (+data.in - data.usePark)
          }
        } else {
          this.counterState = this.counterState
        }
      },
      (err) => {
        console.log("getData", err);
      }
    )
  }

  sendData() {
    this.streamDataService.sendData(this.chanel, null);
  }

  convertDate(val) {
    return moment(val, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss').toString()
  }

}
