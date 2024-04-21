import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import headerComponent from '../../shared/front-page/header.component';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [
    CommonModule, RouterModule, headerComponent
  ],
  templateUrl: './front-page.component.html',
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FrontPageComponent { }
