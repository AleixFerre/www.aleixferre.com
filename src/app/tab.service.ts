import { Injectable, signal } from '@angular/core';
import { TABS } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private _currentTab = signal<TABS | undefined>(undefined);

  readonly currentTab = this._currentTab.asReadonly();

  setCurrentTab(newTab: TABS): void {
    this._currentTab.set(newTab);
  }
}
