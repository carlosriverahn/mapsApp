import { AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-small-map',
  templateUrl: './small-map.component.html',
  styleUrls: ['./small-map.component.css']
})
export class SmallMapComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [ 0, 0 ];

  @ViewChild('map') map!: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.map.nativeElement, // Element Html
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    new mapboxgl.Marker()
        .setLngLat(this.lngLat)
        .addTo(map);
    
    
  }

  ngOnInit(): void {
  }

}
