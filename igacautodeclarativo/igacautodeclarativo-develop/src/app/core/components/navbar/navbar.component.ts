import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@app/modules/session/session.service';
import {Menu} from '@shared/constants/menu/menu';
import {StorageService} from '@shared/services/storage/storage.service';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'igac-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menu: any[];
  username: string;
  loa: string;
  /**
   * Enlace unidireccional del dataholder global y la vista
   * @returns void
   */
   get isLogged() {
    let isLogged = this.sessionService.isLoggedIn();
    console.log("isLogged",isLogged)
    return isLogged;
  }

  constructor(
    private storageService: StorageService,
    private sessionService: SessionService,
    private router: Router,
    //TODO:
    private keycloakService: KeycloakService
  ) {
  }

  ngOnInit(): void {
    this.initValues();
  }

  initValues(): void {
    this.username = this.storageService.getFullname();
    this.loa = this.storageService.getLOA();

    if (this.loa == 'loa:1') {
      this.menu = [
        {
          label: 'Inicio',
          url: 'inicio'
        }
      ];
    } else {
      this.menu = Menu.navbar;
    }
  }

  onLogout(): void {
    //TODO: 
    //this.keycloakService.logout();
    this.sessionService.logoutObservable();
    this.router.navigate(["/"]);
  }
}
