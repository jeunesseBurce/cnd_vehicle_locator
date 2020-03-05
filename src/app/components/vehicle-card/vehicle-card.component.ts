import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent implements OnInit {
  @Input() vehicles;
  constructor() { }

  ngOnInit(): void {
  }

  high = '#3DCC93';
  low = '#dd4b39';
}
