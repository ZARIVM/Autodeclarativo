import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'igac-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadCrumb: any[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initValues();
  }

  initValues(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).pipe(
      map(() => this.activatedRoute)
    ).pipe(
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
    ).pipe(
      filter(route => route.outlet === PRIMARY_OUTLET)
    ).subscribe(route => {
      this.breadCrumb = [];
      if (isNotNullOrUndefined(route.root)) {
        this.setTreeRoute(route.root);
      }

      this.breadCrumb = [{
        name: 'Inicio',
        url: '/',
        breadcrumblink: true,
        show: true
      }, ...this.breadCrumb.reverse()];

      this.breadCrumb.map((content, index, array) => {
        if (index > 0) {
          const parent = array[index - 1].url;
          const separtator = parent !== '/' ? '/' : '';
          content.url = parent + separtator + content.url;
        }
        return content;
      });
    });
  }

  private setTreeRoute(parent: ActivatedRoute): void {
    if (isNotNullOrUndefined(parent.children) && parent.children.length > 0) {
      if (isNotNullOrUndefined(parent.children[0].snapshot)) {
        this.setTreeRoute(parent.children[0]);
      }
    }
    const url = parent.snapshot.url.join('');
    if (isNotNullOrUndefined(parent.snapshot) && isNotNullOrUndefined(parent.snapshot.data.breadcrumb)) {
      if (parent.snapshot.data.show !== false) {
        this.breadCrumb = [...this.breadCrumb, {
          name: parent.snapshot.data.breadcrumb,
          url,
          breadcrumblink: parent.snapshot.data.breadcrumblink
        }];
      }
    }
  }
}
