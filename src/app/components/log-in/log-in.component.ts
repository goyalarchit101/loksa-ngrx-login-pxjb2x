import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Login } from '../../store/actions/auth.actions';
import { IAppState, selectAuthState } from '../../store/app.states';
import { IState } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: User = new User();
  loginFrom: FormGroup;
  state: Observable<any>;
  error: any;
  constructor(private fb: FormBuilder, private store: Store<IAppState>) { 
    this.state = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.state.subscribe((s: IState) => {
      this.error = s.error
    })
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginFrom = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    console.log(this.loginFrom.valid);
    console.log(this.loginFrom.value);
    this.store.dispatch(new Login(this.loginFrom.value));
  }

}