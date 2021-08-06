import { Component, OnInit } from '@angular/core';
import  * as mapboxgl  from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent implements OnInit {

  
  
  constructor() { }
  
  ngOnInit(): void {
      
    let map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-5.96294, 37.37810], // starting position [lng, lat]
      zoom: 16, // starting zoom
      
    });
    
  }


}
