import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 0;
  lng = 0;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 1,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['moon']
    }
  };


  marker = new google.maps.Marker({
    position: this.coordinates,
    icon: '../../../assets/images/control-center.png',
    map: this.map,
  });

  constructor() { }

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

    var moonMapType = new google.maps.ImageMapType({
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
      // radius: 1738000,
      name: 'Moon'
    });

    

    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.map.mapTypes.set('moon', moonMapType);
    this.map.setMapTypeId('moon');
   }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }
}