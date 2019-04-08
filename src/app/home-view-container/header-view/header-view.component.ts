import {Component} from '@angular/core';
import {AuthenticationService} from '../../authentication-service-guards/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css']
})
export class HeaderViewComponent {

  constructor(private auth_service: AuthenticationService) {}

  logout() {
    this.auth_service.logout();
  }
}

