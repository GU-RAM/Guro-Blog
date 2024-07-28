import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ApiService, UserSearchModel } from '../../../core';
import { takeUntil, tap } from 'rxjs';

type UserFilterForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
};

const Modules = [
  ReactiveFormsModule,
  NzGridModule,
  NzInputModule,
  NzSelectModule,
  NzCollapseModule,
  NzFormModule,
];

@Component({
  selector: 'app-filter-users',
  standalone: true,
  imports: [...Modules],
  templateUrl: './filter-users.component.html',
  styleUrl: './filter-users.component.scss',
})
export class FilterUsersComponent {
  #fb = inject(NonNullableFormBuilder);

  filter = output<Partial<UserSearchModel>>();

  filterForm: FormGroup<UserFilterForm> = this.#fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
  });

  constructor(private apiService: ApiService) {}

  submitForm() {
    this.filter.emit(this.filterForm.value);
  }

  resetForm() {
    this.filterForm.reset();
    this.filter.emit(this.filterForm.value);
  }
}
