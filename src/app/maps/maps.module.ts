import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { SmallMapComponent } from './components/small-map/small-map.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';


@NgModule({
  declarations: [
    SmallMapComponent,
    FullScreenComponent,
    MarkersComponent,
    ZoomRangeComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
