import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private appName = 'Gestion Salle - Voxens'; // Centralized app name

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute) {}

  initializeTitleListener() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data),
        map(data => {
          const routeTitle = data['title'] || ''; // Title from route data or empty
          return routeTitle ? `${routeTitle} - ${this.appName}` : this.appName;
        })
      )
      .subscribe((pageTitle: string) => {
        this.title.setTitle(pageTitle);
      });
  }
}
