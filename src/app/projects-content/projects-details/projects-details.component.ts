import { DatePipe, KeyValuePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ALL_PROJECTS, DUMMY_PROJECT, Project } from '../projects.model';
import { ProjectsService } from '../projects.service';
import { GalleryComponent } from './gallery/gallery.component';
import { keepOrder } from './keepOrder';

@Component({
  selector: 'app-projects-details',
  imports: [KeyValuePipe, DatePipe, GalleryComponent],
  templateUrl: './projects-details.component.html',
  styleUrl: './projects-details.component.scss',
})
export class ProjectsDetailsComponent {
  keepOrder = keepOrder;

  readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      this.projectsService.currentlyActiveId();
      this.rebuildProject();
    });
  }

  showPreview = signal(false);

  rebuildProject(): void {
    this.showPreview.set(false);
    setTimeout(() => {
      this.showPreview.set(true);
    }, 0);
  }

  projects = ALL_PROJECTS;

  setCurrentlyActiveId(id: string | null) {
    const url = ['projects', id].filter((x) => x !== null);

    this.router.navigate(url, {
      replaceUrl: true,
      queryParamsHandling: 'replace',
    });
  }

  findProject(id: string): Project {
    return this.projects.find((project) => project.id === id) || DUMMY_PROJECT;
  }

  getProjectDuration(project: Project): string {
    const createdAt = project.createdAt;
    const finishedAt = project.finishedAt!;

    let start = new Date(createdAt);
    let end = new Date(finishedAt);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    const days = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (months < 0) {
      years--;
      months += 12;
    }

    let result = '';

    if (years > 0) {
      result += `${years} year${years > 1 ? 's' : ''}`;
    }

    if (months > 0 || years === 0) {
      if (result) result += ' and ';
      result += `${months} month${months !== 1 ? 's' : ''}`;
    }

    if (months <= 0 && years <= 0) {
      if (days >= 1 && days <= 3) {
        return `${days} day${days !== 1 ? 's' : ''}`;
      }
      result = 'A week';
    }

    return result;
  }
}
