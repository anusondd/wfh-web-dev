import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParkingStatsService {

  constructor(
    public http: HttpClient,
  ) { }

  update(params) {
    console.log("params : ",params);

    return this.http.post(`${environment.HOST_API}/parking/update`, params).pipe(map((res: any) => res.data))
  }

}
