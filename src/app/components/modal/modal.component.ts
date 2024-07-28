import { Component, Inject, Input, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';

const Modules = [NzModalModule];
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [...Modules],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  isVisible = false;

  constructor(@Inject(NZ_MODAL_DATA) public data: { content: string }) {}

  ngOnInit() {}

  handleOk(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
