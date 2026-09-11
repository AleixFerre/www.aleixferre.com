import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { ALL_PROJECTS } from './projects.model';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects-content',
  imports: [ProjectsDetailsComponent],
  templateUrl: './projects-content.component.html',
  styleUrl: './projects-content.component.scss',
})
export class ProjectsContentComponent {
  private readonly router = inject(Router);
  readonly projectsService = inject(ProjectsService);

  projects = ALL_PROJECTS;


  setCurrentlyActiveId(id: string | null) {
    const url = ['projects', id].filter((x) => x !== null);

    this.router.navigate(url, {
      replaceUrl: true,
      queryParamsHandling: 'replace',
    });
  }
}
