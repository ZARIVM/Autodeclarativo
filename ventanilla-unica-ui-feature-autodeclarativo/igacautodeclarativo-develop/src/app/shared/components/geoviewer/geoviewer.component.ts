import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PrediosService} from '@shared/services/predios/predios.service';
import {HandleErrorService} from '@shared/services/handle-error/handle-error.service';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {LoadingService} from '@shared/services/loading/loading.service';

@Component({
  selector: 'igac-geoviewer',
  templateUrl: './geoviewer.component.html',
  styleUrls: ['./geoviewer.component.scss']
})
export class GeoviewerComponent implements OnInit, OnDestroy {

  @Input() numeroPredial: string;
  predio: any;

  map: L.map;
  baseLayers: any;

  constructor(
    private loadingService: LoadingService,
    private prediosService: PrediosService,
    private handleErrorService: HandleErrorService
  ) {
  }

  ngOnInit(): void {
    this.initMap();
    this.initParameters();
  }

  initParameters(): void {
    this.loadingService.loadingOn();
    this.prediosService.getPredioGeo(this.numeroPredial).subscribe(predio => {
      this.loadingService.loadingOff();
      this.predio = predio ? predio : null;
      this.initPredios();
    }, error => {
      this.loadingService.loadingOff();
      this.handleErrorService.handleError(error);
    });
  }

  initMap(): void {
    this.baseLayers = this.getBaseLayers();
    this.map = L.map('map', {
      layers: [this.baseLayers.Streets],
      center: [4.596655, -74.070679],
      zoom: 11
    });
    this.map.invalidateSize();
    L.control.layers(this.baseLayers).addTo(this.map);
  }

  initPredios(): void {
    if (isNotNullOrUndefined(this.predio) &&
      isNotNullOrUndefined(this.predio.features.length) &&
      this.predio.features.length > 0) {
      const geojson = L.geoJSON(this.predio).addTo(this.map);
      this.map.fitBounds(geojson.getBounds());
      this.map.setZoom(15);
    }
  }

  getBaseLayers(): any {
    const baseLayers = {};

    baseLayers['Streets'] = esri.basemapLayer('Streets', {
      attribution: '',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1
    });

    baseLayers['Topographic'] = esri.basemapLayer('Topographic', {
      attribution: '',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1
    });

    baseLayers['Imagery'] = esri.basemapLayer('Imagery', {
      attribution: '',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1
    });

    baseLayers['Gray'] = esri.basemapLayer('Gray', {
      attribution: '',
      maxZoom: 17,
      tileSize: 512,
      zoomOffset: -1
    });

    return baseLayers;
  }

  get existsPredio(): boolean {
    return isNotNullOrUndefined(this.predio);
  }

  ngOnDestroy(): void {
    document.getElementById('map').outerHTML = '';
  }
}
