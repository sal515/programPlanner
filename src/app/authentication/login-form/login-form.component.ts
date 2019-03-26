import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
 private loginForm: FormGroup;
 private submitted = false;
 private missing_netname = false;
 private missing_password = false;
 private auth_failed = false;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      netname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formData() {return this.loginForm.controls;}

  onSubmit()
  {
    this.submitted=true;
    let netnameChecked = !this.isNetnameMissing(this.formData.netname.value);
    let passwordChecked = !this.isPasswordMissing(this.formData.password.value);
    if(netnameChecked && passwordChecked)
    {
      this.authenticationService.checkUserProfile(this.formData.netname.value, this.formData.password.value)
      .then(result =>
      {
        if(result == false)
        this.auth_failed=true;
      })
    }
  }
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
