import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalDetailsService } from '../../services/personal-details.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  profileForm!: FormGroup;

  @ViewChild('datePicker') datePicker!: ElementRef;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private personalDetailsService: PersonalDetailsService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // const savedData = this.personalDetailsService.getFormData();

    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      displayName: ['יוסי כהן'],
      day: ['19', [Validators.required, Validators.min(1), Validators.max(31)]],
      month: [
        '01',
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      year: [
        '1992',
        [
          Validators.required,
          Validators.min(1960),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      telephone: ['', Validators.required],
      pelephone: ['', Validators.required],
      role: ['', Validators.required],
      receiveBirthdayNotifications: [],
      showProfilePicture: [],
    });

    // if (savedData) {
    //   this.profileForm.patchValue(savedData);
    // }
    const userDetailsSubscription = this.personalDetailsService
      .getUserDetails()
      .subscribe(
        (userData) => {
          console.log('Received userData:', userData); // Debug line

          this.profileForm.patchValue({
            firstName: userData.firstName,
            lastName: userData.lastName,
            displayName: userData.displayName,
            day: userData.day,
            month: userData.month,
            year: userData.year,
            telephone: userData.telephone,
            pelephone: userData.pelephone,
            role: userData.role,
            receiveBirthdayNotifications: userData.receiveBirthdayNotifications,
            showProfilePicture: userData.showProfilePicture,
          });
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );

    this.subscription.add(userDetailsSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get yearErrors() {
    return this.profileForm.get('year')?.errors;
  }

  get monthErrors() {
    return this.profileForm.get('month')?.errors;
  }

  get dayErrors() {
    return this.profileForm.get('day')?.errors;
  }

  openDatePicker() {
    this.datePicker.nativeElement.click();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.personalDetailsService
        .updateUserDetails(this.profileForm.value)
        .subscribe(
          (updatedUser) => {
            console.log('User updated', updatedUser);
            this.sharedService.changeDisplayName(updatedUser.displayName);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
    }
  }

  dateChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    const date = new Date(input.value);

    if (date) {
      this.profileForm.patchValue({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }
  }
}
