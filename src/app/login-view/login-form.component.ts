import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication-service-guards/authentication.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

/**
 * This class defines the event listeners and the variables of the login page.
 */
export class LoginFormComponent implements OnInit {
   private loginForm: FormGroup;
   private submitted = false;
   private missing_netname = false;
   private missing_password = false;
   private auth_failed = false;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {}
  // formBuilder: angular support for forms

  /**
   * Initializing the form in the login page.
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      netname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Checks if the userID and password are not empty.
   * Signs in the user to server with the given credentials.
   * If login fails, tell the user that the userID or password is wrong.
   */
  onSubmit()
  {
    this.submitted=true;

    let netnameChecked = !this.isNetnameMissing(this.loginForm.controls.netname.value);
    let passwordChecked = !this.isPasswordMissing(this.loginForm.controls.password.value);

    if(netnameChecked && passwordChecked)
    {
      this.authenticationService.login(this.loginForm.controls.netname.value, this.loginForm.controls.password.value)
      .then(result =>
      {
        if(result == false)
        this.auth_failed=true;
      })
    }
  }

  /**
   * If the userID is empty, display error message.
   * @param value
   */
  isNetnameMissing(value: string): boolean
  {
    if(value=="")
    {
      this.missing_netname=true;
      return true
    }
    else
    {
      this.missing_netname=false;
      return false
    }
  }

  /**
   * If the password is empty, display error message.
   * @param value
   */
  isPasswordMissing(value: string): boolean
  {
    if(value=="")
    {
      this.missing_password=true;
      return true
    }
    else
    {
      this.missing_password=false;
      return false
    }
  }
}
