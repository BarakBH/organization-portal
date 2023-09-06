import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalDetailsService {
  private apiUrl = 'http://localhost:3000/user';
  private formData: any = null;
  // private displayName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getPersonalDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserDetails() {
    return this.http.get<any>(this.apiUrl);
  }

  updateUserDetails(user: any): Observable<any> {
    return this.http.put(this.apiUrl, user);
  }

  // updateDisplayName(name: string) {
  //   this.displayName.next(name);
  // }

  // getDisplayName() {
  //   return this.displayName.asObservable();
  // }

  // saveFormData(data: FormGroup) {
  //   this.formData = data.value;
  // }

  getFormData(): any {
    return this.formData;
  }
}
