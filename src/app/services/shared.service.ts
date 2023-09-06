import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private displayNameSource = new BehaviorSubject<string>('');
  currentDisplayName = this.displayNameSource.asObservable();

  constructor() {}

  changeDisplayName(name: string) {
    this.displayNameSource.next(name);
  }
}
