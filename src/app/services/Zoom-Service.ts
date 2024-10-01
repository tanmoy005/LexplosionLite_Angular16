import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private minZoomLevel = 0.1;
  private maxZoomLevel = 5;

  constructor() {}

  zoomIn(currentZoom: number = 1): number {
    let newZoom = currentZoom + 0.1;
    if (newZoom > this.maxZoomLevel) {
      newZoom = this.maxZoomLevel;
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
