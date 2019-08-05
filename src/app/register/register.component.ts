import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../User';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  users: User[];
  user: User;

  constructor() {
    this.user = new User();
    this.users = [];
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
        email: new FormControl('', [Validators.required,
          Validators.minLength(6),
          Validators.email]),
        pwGroup: new FormGroup({
          password: new FormControl('', [Validators.required,
            Validators.minLength(6)]),
          confirmPassword: new FormControl('', [Validators.required,
            Validators.minLength(6)])
        }, comparePassword),
        country: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required, Validators.min(18)]),
        gender: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^\+84\d{9,10}$/)])
      }
    );

    this.registerForm.patchValue({
      email: 'info@example.com'
    });
  }

  onSubmit() {
    this.users.push(this.user);
  }
}
