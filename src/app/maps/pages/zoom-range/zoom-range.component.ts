import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  private mapElement!: mapboxgl.Map;
  zoom: number = 15;
  center: [number, number]= [-5.96294, 37.37810];


  @ViewChild('map') map!: ElementRef

  constructor() { }
  ngOnDestroy(): void {
    // Gold rule. Always destroy Observables and listeners
    this.mapElement.off( 'zoom', () =>{} );
    this.mapElement.off( 'zoomend', () =>{} );
    this.mapElement.off( 'move', () =>{} );
  }
  ngAfterViewInit(): void {
     this.mapElement = new mapboxgl.Map({
      container: this.map.nativeElement, // Element Html
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    
    this.mapElement.on('zoom', (ev) => {
      const ActualZoom = this.mapElement.getZoom();
      this.zoom =  ActualZoom;
      
    });

    this.mapElement.on('zoomend', (ev) => {
     if( this.mapElement.getZoom() > 18 ){
      this.mapElement.zoomTo(18);
     }      
    });

    this.mapElement.on('move', (ev) => {
      const target = ev.target;
      const { lng, lat } = target.getCenter();
      this.center = [ lng, lat ]
    })
    
  }
  
  zoomOut(){
    this.mapElement.zoomOut();
  }
  
  zoomIn(){
    this.mapElement.zoomIn();
  }

  setZoomRange(zoomInput: string){
    this.mapElement.setZoom( Number(zoomInput) );
  }
  
}
