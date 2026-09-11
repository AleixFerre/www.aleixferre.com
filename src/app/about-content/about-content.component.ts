import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TABS } from '../app.model';
import { MetricContainerComponent } from '../shared/metric-container/metric-container.component';
import { ABOUT } from './about-content.model';

@Component({
  selector: 'app-about-content',
  imports: [MetricContainerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './about-content.component.html',
  styleUrl: './about-content.component.scss',
})
export class AboutContentComponent {
  private readonly router = inject(Router);

  ABOUT = ABOUT;

  age = new Date().getFullYear() - 2000;


  goToContact() {
    this.router.navigate([TABS.CONTACT], {
      replaceUrl: true,
      queryParamsHandling: 'replace',
    });
  }
}
