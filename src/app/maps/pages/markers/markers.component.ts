import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface ColorMaker {
  color   : string;
  markers? : mapboxgl.Marker;
  center?  : [ number, number ] 
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements AfterViewInit {
  
  @ViewChild('map') map!: ElementRef
  private mapElement!: mapboxgl.Map;
  zoom: number = 15;
  center: [number, number] = [-5.96294, 37.37810];

  markersArray: ColorMaker[] = [];

  constructor() { }
  ngAfterViewInit(): void {
    this.mapElement = new mapboxgl.Map({
      container: this.map.nativeElement, // Element Html
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.getLocalStorage();

    // add marker
    // const marker = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapElement)


  }

  goMarker(marker: mapboxgl.Marker){
    this.mapElement.flyTo({
      center: marker.getLngLat(),
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
  }
  
  saveMarker() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat( this.center )
      .addTo( this.mapElement );

      this.markersArray.push({
        color,
        markers: newMarker
      });

      newMarker.on('dragend', () => {
        this.saveLocalStorage()
      })

      this.saveLocalStorage();
     
  } 

  deleteMarker( idx: number) {
    this.markersArray[idx].markers?.remove();
    this.markersArray.splice(idx, 1);
    this.saveLocalStorage();

  }

  saveLocalStorage() {

    const colorMakerArr: ColorMaker[] = []
    this.markersArray.forEach(m => {

      const color =m.color
      const {lng, lat} = m.markers!.getLngLat();

      colorMakerArr.push({
        color: m.color,
        center: [ lng, lat ]
      })

    });

    localStorage.setItem('mapsMakers', JSON.stringify(colorMakerArr))

  }

  getLocalStorage() {
    if (!localStorage.getItem('mapsMakers')) {
      return;
    }

    const mapsMakersArr: ColorMaker[] = JSON.parse(localStorage.getItem('mapsMakers')!) 

    mapsMakersArr.forEach(m => {

      const newMarker = new mapboxgl.Marker({ draggable: true, color: m.color })
      .setLngLat( m.center! )
      .addTo( this.mapElement );

      this.markersArray.push({
        color: m.color,
        markers: newMarker
      });

      newMarker.on('dragend', () => {
        this.saveLocalStorage()
      })

    })


  }


}
