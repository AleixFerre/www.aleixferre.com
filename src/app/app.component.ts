import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { AboutContentComponent } from './about-content/about-content.component';
import { TABS, TABS_LIST } from './app.model';
import { BackgroundStarsComponent } from './background-stars/background-stars.component';
import { ContactContentComponent } from './contact-content/contact-content.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { ProjectsContentComponent } from './projects-content/projects-content.component';
import { keepOrder } from './projects-content/projects-details/keepOrder';
import { ProjectsService } from './projects-content/projects.service';
import { TabService } from './tab.service';

@Component({
  selector: 'app-root',
  imports: [
    HomeContentComponent,
    ProjectsContentComponent,
    ContactContentComponent,
    AboutContentComponent,
    BackgroundStarsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  keepOrder = keepOrder;

  TABS = TABS;

  tabsListEntries: [TABS, string][] = Object.entries(TABS_LIST) as [
    TABS,
    string
  ][];

  constructor(
    public tabService: TabService,
    private projectsService: ProjectsService,
    private router: Router
  ) {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const name = event.urlAfterRedirects.split('/')[1] || TABS.HOME;
        this.tabService.setCurrentTab(name as TABS);

        if (name === TABS.PROJECTS) {
          this.projectsService.setCurrentlyActiveId(
            event.urlAfterRedirects.split('/')[2] ?? null
          );
        }
      }
    });
  }

  selectTab(tab: TABS) {
    this.router.navigate([tab], {
      replaceUrl: true,
      queryParamsHandling: 'replace',
    });
  }
}
