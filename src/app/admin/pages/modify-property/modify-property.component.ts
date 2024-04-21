import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  template: './modify-property.component.html',
  styles: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ModifyPropertyComponent { }
