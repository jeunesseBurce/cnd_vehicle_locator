import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent implements OnInit {
  message: string;
  constructor(
    private data: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onClick(lat, long): void {
    this.data.updateCoord(lat, long);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(lat, long), 
      new google.maps.LatLng(0.681400, 23.460550)
    );
   
    this.message = distance.toFixed(2) + ' km away from command center';

    this._snackBar.open(this.message, 'Close', {
      verticalPosition: 'top'
    });
  }

  
}