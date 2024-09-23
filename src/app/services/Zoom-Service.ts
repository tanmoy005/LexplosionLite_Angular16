import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private minZoomLevel = 0.1; // Minimum zoom level
  private maxZoomLevel = 5; // Maximum zoom level (if you want to set one)

  constructor() {}

  zoomIn(currentZoom: number = 1): number {
    let newZoom = currentZoom + 0.1;
    if (newZoom > this.maxZoomLevel) {
      newZoom = this.maxZoomLevel; // Limit the zoom level if needed
    }
    return newZoom;
  }

  zoomOut(currentZoom: number = 1): number {
    let newZoom = currentZoom - 0.1;
    if (newZoom < this.minZoomLevel) {
      newZoom = this.minZoomLevel;
    }
    return newZoom;
  }
}
