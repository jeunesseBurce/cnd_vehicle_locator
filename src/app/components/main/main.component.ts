import { Component, OnInit, Output } from '@angular/core';
import { VehiclesService } from './../../services/vehicles.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  vehicleID;
  vehicles = [];
  
  constructor(
    private vehiclesService: VehiclesService
  ) { }

  ngOnInit(): void {
    var i;
    for (i = 0; i < 6; i++) {
      this.vehiclesService.getVehicle(i).subscribe((data: any[])=>{
        this.vehicles.push(data);
      });
    }
  }

  title = 'Lunar Locator';
}
