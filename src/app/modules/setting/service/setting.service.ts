import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ParkingBox } from 'src/app/shared/interface/parkingBox';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    public http: HttpClient,
    public fb: FormBuilder,
  ) { }

  getParking(){
    return this.http.get('assets/json/parking/parking-get.res.json').pipe(map(
      (res:any)=>{
        return res.data
      }
    ));
  }

  // แปลง Object to FromGroup
  public convertFromGroup(rowData){
    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        const element = rowData[key]

        if (element instanceof Array) {
          let farray =  element.map((v,i)=>{
            return this.convertFromGroup(v);
          })
          rowData[key] = this.fb.array(farray)
        } else if (element instanceof Object) {
          rowData[key] = this.convertFromGroup(element)
          
        }else{
          rowData[key] = this.fb.control(element,[])
        }

      }
    }

    return this.fb.group(rowData);
  }

  getSensor(){
    return this.http.get(`${environment.HOST_API}/sensor/sensor`).pipe(map((res:any)=>res.data))
  }

  getSettingSensor(){
    return this.http.get(`${environment.HOST_API}/setting/getby-parking`).pipe(map((res:any)=>res.data))
  }

  updateSettingSensor(_params){
    return this.http.put(`${environment.HOST_API}/setting/status`,_params)
  }

  connectSettingSensor(_params){
    return this.http.put(`${environment.HOST_API}/setting/connect`,_params)
  }

  //Parking Row Service
  getParkingRow(_parkingID){
    return this.http.get(`${environment.HOST_API}/setting/parking-row?parkingID=`+_parkingID).pipe(map((res:any)=>res.data))
  }
  addParkingRow(_parkingRow){
    return this.http.post(`${environment.HOST_API}/setting/parking-row`,_parkingRow)
  }
  delteParkingRow(_parkingRow){
    return this.http.delete(`${environment.HOST_API}/setting/parking-row`,{params:_parkingRow})
  }
  

  //Parking Box Service
  addParkingBox(_parkingBox){
    delete _parkingBox._id
    return this.http.post(`${environment.HOST_API}/setting/parking-box`,_parkingBox)
  }
  updateParkingBox(_parkingBox){
    return this.http.put(`${environment.HOST_API}/setting/parking-box`,_parkingBox)
  }

  deleteParkingBox(_parkingBoxID){
    return this.http.delete(`${environment.HOST_API}/setting/parking-box?_id=`+_parkingBoxID)
  }

  //Parking Stats Service
  getParkingStats(){
    return this.http.get(`${environment.HOST_API}/parking/get-first`).pipe(map((res:any)=>res.data))
  }
  updateParkingStats(_parkingStats){
    return this.http.post(`${environment.HOST_API}/parking/update`,_parkingStats)
  }

  // Provice Service
  getProvice(){
    return this.http.get(`${environment.HOST_API}/provice/getall`).pipe(map((res:any)=>res.data))
  }

}
