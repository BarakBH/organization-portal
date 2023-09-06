import { Component, OnInit } from '@angular/core';

interface Employee {
  name: string;
  profession: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  showDetails?: boolean;
}

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss'],
})
export class PhoneBookComponent implements OnInit {
  private _searchTerm: string = '';
  groupedEmployees: { [key: string]: Employee[] } = {};

  employees: Employee[] = [
    {
      name: 'אברהם',
      profession: 'מתכנת',
      email: 'abraham@email.com',
      phone: '050-5544845',
      role: 'מפתח תוכנה',
      location: 'ירושלים',
      showDetails: false,
    },
    {
      name: 'אודי',
      profession: 'מבצע',
      email: 'odi@email.com',
      phone: '050-4554555',
      role: 'מבצע',
      location: 'תל-אביב',
      showDetails: false,
    },
    {
      name: 'בניה',
      profession: 'יועץ',
      email: 'bnaya@email.com',
      phone: '056-6550487',
      role: 'builder',
      location: 'אילת',
      showDetails: false,
    },
    {
      name: 'גל',
      profession: 'מאפיינת',
      email: 'gal@email.com',
      phone: '050-4568447',
      role: 'exaimantor',
      location: 'ירושלים',
      showDetails: false,
    },
    {
      name: 'הדר',
      profession: 'מעצבת',
      email: 'hadar@email.com',
      phone: '050-5988441',
      role: 'designer',
      location: 'ירושלים',
      showDetails: false,
    },
    {
      name: 'טובה',
      profession: 'מנהלת אגף',
      email: 'tova@email.com',
      phone: '050-0445577',
      role: 'Manager',
      location: 'תל-אביב',
      showDetails: false,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.updateGroupedEmployees();
  }

  updateGroupedEmployees() {
    const filtered = this.employees.filter((employee) =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.groupedEmployees = this.groupByFirstLetter(filtered);
  }

  // Add a setter for searchTerm to detect its changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.updateGroupedEmployees();
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  toggleDetails(employee: Employee) {
    employee.showDetails = !employee.showDetails;
  }

  groupByFirstLetter(employees: Employee[]): { [key: string]: Employee[] } {
    return employees.reduce(
      (acc: { [key: string]: Employee[] }, curr: Employee) => {
        const firstLetter = curr.name.charAt(0);
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(curr);
        return acc;
      },
      {}
    );
  }

  getGroupedEmployeeKeys() {
    return Object.keys(this.groupedEmployees);
  }
}
