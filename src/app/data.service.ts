import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  postData(data:any){
    return this.http.post(" http://localhost:3000/nishanthan",data);
  }
  getData(data:any){
    return this.http.get("http://localhost:3000/nishanthan");
  }
  getbyId(id:any){
    return this.http.get("http://localhost:3000/nishanthan"+"/"+id);
  }
  update(id:any,data:any){
    return this.http.put("http://localhost:3000/nishanthan"+"/"+id,data);
  }
  deleteData(id:any){
    return this.http.delete("http://localhost:3000/nishanthan"+"/"+id);
  }
}
