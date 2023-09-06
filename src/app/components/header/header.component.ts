import { Component, OnInit } from '@angular/core';
import { PersonalDetailsService } from '../../services/personal-details.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  userImage: string = '../../assets/images/user-img.jpeg';

  constructor(
    private personalService: PersonalDetailsService,
    private sharedService: SharedService
  ) {
    this.sharedService.currentDisplayName.subscribe(
      (name) => (this.userName = name)
    );
  }

  ngOnInit(): void {
    this.personalService.getPersonalDetails().subscribe(
      (data) => {
        if (data && data.displayName) {
          this.userName = data.displayName;
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
