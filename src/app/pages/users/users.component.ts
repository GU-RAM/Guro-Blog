import { Component, OnInit } from '@angular/core';
import { User, UserSearchModel } from '../../core';
import { ApiService } from '../../core';
import { NgClass } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FilterUsersComponent } from './filter-users/filter-users.component';
import { tap } from 'rxjs';

const Modules = [
  RouterLink,
  NgClass,
  NzTableModule,
  NzButtonModule,
  NzToolTipModule,
  NzGridModule,
];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [...Modules, FilterUsersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.getAllUsers().subscribe((users) => {
      users.forEach((user) => {
        const nameParts = user.name.split(' ');
        user.firstName = nameParts[0];
        user.lastName = nameParts[1];
      });
      this.users = users;
    });
  }

  onFilter(filter: Partial<UserSearchModel>) {}

  ngOnInit(): void {}
}
