import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TABS } from '../app.model';
import { FEATURED_PROJECTS } from '../projects-content/projects.model';
import { IconTextComponent } from '../shared/icon-text/icon-text.component';
import { MetricContainerComponent } from '../shared/metric-container/metric-container.component';
import { TabService } from '../tab.service';

@Component({
  selector: 'app-home-content',
  imports: [MetricContainerComponent, IconTextComponent],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss',
})
export class HomeContentComponent {
  projects = FEATURED_PROJECTS;

  yearsSinceIndie = this.calculateYearsSince(new Date('2017-01-01')).toString();
  yearsSinceWeb = this.calculateYearsSince(new Date('2021-09-01')).toString();

  constructor(public tabService: TabService, private router: Router) {}

  selectGame(id: string) {
    const url = [TABS.PROJECTS, id].filter((x) => x !== null);
    this.router.navigate(url, {
      replaceUrl: true,
      queryParamsHandling: 'replace',
    });
  }

  goToProfile() {
    this.router.navigate([TABS.ABOUT], {
      replaceUrl: true,
      queryParamsHandling: 'replace',
    });
  }

  private calculateYearsSince(startDate: Date): number {
    const now = new Date();
    const diffInMs = now.getTime() - startDate.getTime();
    const years = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years);
  }
}
