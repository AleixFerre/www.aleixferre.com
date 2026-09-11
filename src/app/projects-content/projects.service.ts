import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ALL_PROJECTS } from './projects.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly router = inject(Router);

  private currentProject = signal<string | null>(null);

  readonly currentlyActiveId = this.currentProject.asReadonly();

  setCurrentlyActiveId(index: string | null): void {
    if (index !== null) {
      const foundProject = ALL_PROJECTS.find((x) => x.id === index);

      if (!foundProject) {
        this.router.navigate(['projects'], {
          replaceUrl: true,
          queryParamsHandling: 'replace',
        });
        return;
      }
    }

    this.currentProject.set(index);

    if (!index) {
      return;
    }

    this.router.navigate(['projects', index], {
      replaceUrl: true,
      queryParamsHandling: 'replace',
    });
  }
}
