import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  readonly tabService = inject(TabService);
  private readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);

  keepOrder = keepOrder;

  TABS = TABS;

  tabsListEntries: [TABS, string][] = Object.entries(TABS_LIST) as [
    TABS,
    string
  ][];

  constructor() {
    effect(() => {
      const navigation = this.router.lastSuccessfulNavigation();

      if (!navigation?.finalUrl) {
        return;
      }

      const [, name, id] = this.router
        .serializeUrl(navigation.finalUrl)
        .split(/[?#]/)[0]
        .split('/');

      const tab = (name || TABS.HOME) as TABS;

      this.tabService.setCurrentTab(tab);

      if (tab === TABS.PROJECTS) {
        this.projectsService.setCurrentlyActiveId(id ?? null);
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
