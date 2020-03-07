import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})

export class VehicleCardComponent implements OnInit {
  vehicles = [];
  message: string;
  distance;

  constructor(
    private data: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.data.fetchAllVehicles();
    this.data.vehicles.subscribe(vehicles => {
      this.vehicles = vehicles
    });
  }

  onClickMe(vehicle) {
      this.data.updateCoord(vehicle.lat, vehicle.long);
      this.distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(vehicle.lat, vehicle.long),
        new google.maps.LatLng(0.681400, 23.460550)
      );

      this.distance = this.distance.toFixed(2);
      this.message = vehicle.name + ' is ' + this.distance + ' km away from command center';

      this._snackBar.open(this.message, 'Close', {
        verticalPosition: 'top'
      });
  }

  high = '#3DCC93';
  low = '#dd4b39';
}
