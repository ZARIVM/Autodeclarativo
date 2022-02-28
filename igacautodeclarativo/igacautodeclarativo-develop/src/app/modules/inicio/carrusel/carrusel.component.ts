import {Component, OnInit} from '@angular/core';
import {StorageService} from '@shared/services/storage/storage.service';

@Component({
  selector: 'igac-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements OnInit {

  noticias: any[];
  loa: string;

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.initValues();
  }

  initValues(): void {
    this.loa = this.storageService.getLOA();

    if (this.loa === 'loa:1') {
      this.noticias = [
        {
          titulo: 'Necesitamos mejorar nuestro nivel de confianza.',
          descripcion: '',
          iamgen: 'assets/images/vivi-banner-inicio-sesion.png',
          url: '',
          fondo: 'dimgray'
        }
      ];
    } else {
      this.noticias = [
        {
          titulo: 'Ahora estamos más cerca de usted',
          descripcion: 'Ver mas información',
          iamgen: 'assets/images/img-home.jpg',
          url: '/',
          fondo: '#3366CC'
        },
        {
          titulo: 'El catastro con enfoque multipropósito es equidad y paz con legalidad.',
          descripcion: 'Ver mas información',
          iamgen: 'assets/images/img1.jpg',
          url: 'https://igac.gov.co/es/catastro-multiproposito/inicio',
          fondo: 'dimgray'
        },
        {
          titulo: 'El atlas de los colombianos.',
          descripcion: 'Ver mas información',
          iamgen: 'assets/images/img2.jpg',
          url: 'https://www.colombiaenmapas.gov.co/',
          fondo: '#3366CC'
        },
        {
          titulo: 'Ahora estamos más cerca de usted',
          descripcion: 'Ver mas información',
          iamgen: 'string',
          url: '/',
          fondo: 'dimgray'
        }
      ];
    }
  }
}
