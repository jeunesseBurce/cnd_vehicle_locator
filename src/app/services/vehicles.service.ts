import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(
    private http: HttpClient
  ) { }

  getVehicle(vehicleId) {
   return this.http.get(`http://cndlunarlocator.herokuapp.com/vehicles/${vehicleId}/locate.json`);
  }

}
