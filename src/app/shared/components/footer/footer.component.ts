import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../../pages/login/login.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
