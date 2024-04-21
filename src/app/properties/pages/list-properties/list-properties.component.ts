import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-PropertiesComponent',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-properties.component.html',
  styles: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class listPropertiesComponent { }
