import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  templateUrl: './property.component.html',
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PropertyComponent { }
