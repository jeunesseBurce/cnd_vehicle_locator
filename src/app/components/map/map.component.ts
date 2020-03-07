import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 0;
  lng = 0;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 2,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['moon']
    }
  };
  
  pinMarker = new google.maps.Marker({
    position: this.coordinates,
    icon: '../../../assets/images/placeholder.png',
    map: this.map,
  });

  commandCenterMarker = new google.maps.Marker({
    position: new google.maps.LatLng(0.681400, 23.460550),
    icon: '../../../assets/images/control-center.png',
    map: this.map,
  });


  vehicles = [];

  constructor(
    private data: DataService
  ) { }

 getNormalizedCoord(coord, zoom) {
    const tileRange = 1 << zoom;
    const y = coord.y;
    let x = coord.x;

    if (y < 0 || y >= tileRange) {
      return null;
    }

    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {x: x, y: y};
  }
  
  mapInitializer() {
    const moonMapType = new google.maps.ImageMapType({
      getTileUrl: (coord, zoom) => {
          const normalizedCoord = this.getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          const bound = Math.pow(2, zoom);
          return '//mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw' +
              '/' + zoom + '/' + normalizedCoord.x + '/' +
              (bound - normalizedCoord.y - 1) + '.jpg';
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 9,
      minZoom: 0,
      name: 'Moon'
    });

    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    this.pinMarker = new google.maps.Marker({
      position: new google.maps.LatLng(0.681400, 23.460550),
      icon: '../../../assets/images/placeholder.png',
      map: this.map,
    });

    this.pinMarker.setMap(this.map);
    this.pinMarker.setZIndex(999);
    this.commandCenterMarker.setMap(this.map);

    this.map.mapTypes.set('moon', moonMapType);
    this.map.setMapTypeId('moon');
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  ngOnInit(): void {
    this.data.vehicles.subscribe(vehicles => {
      this.vehicles = vehicles;
      for (let i = 0; i < vehicles.length; i++) {
        const roverMarker = new google.maps.Marker({
          position: new google.maps.LatLng(
            vehicles[i].lat, 
            vehicles[i].long),
          icon: '../../../assets/images/moon-rover.png',
          map: this.map
        });
        roverMarker.setMap(this.map);
      }
    });

    this.data.coord.subscribe(coord => {
      const [lat, long] = coord;
      const position = new google.maps.LatLng(lat, long);
      
      this.pinMarker.setZIndex(999);
      this.pinMarker.setPosition(position);
      
    })
  }
}