import { Component, OnInit, Output } from '@angular/core';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  vehicleID;
  
  constructor(
    private data: DataService
  ) { }

  ngOnInit(): void {

  }

  title = 'Lunar Locator';
}