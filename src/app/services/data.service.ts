import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private vehiclesSource = new BehaviorSubject([]);
  vehicles = this.vehiclesSource.asObservable();
  private coordSource = new BehaviorSubject([0, 0]);
  coord = this.coordSource.asObservable();


  constructor(
    private http: HttpClient
  ) { }

  fetchAllVehicles() {
    const observables = [];
    for (let i = 0; i < 6; i++) {
      observables.push(
        this.http.get(`https://cndlunarlocator.herokuapp.com/vehicles/${i}/locate.json`)
      );
    }

    forkJoin(observables)
      .subscribe(vehicles => 
        this.vehiclesSource.next(
          vehicles.sort((v1: any, v2: any) => 
            v1.power_level_percent - v2.power_level_percent
          )
        )
      )
  }

  updateCoord(lat, long) {
    this.coordSource.next([lat, long]);
  }
}