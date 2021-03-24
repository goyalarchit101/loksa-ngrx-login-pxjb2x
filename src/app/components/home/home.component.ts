import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Logout } from '../../store/actions/auth.actions';
import { IAppState } from '../../store/app.states';
import { IState } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  state$: Observable<any>;
  isAuthenticated: boolean;
  error: any;
  user: User;
  constructor(private store: Store<IAppState>) { 
    this.state$ = this.store.select(state => state.auth); 
  }

  ngOnInit() {
    this.state$.subscribe((r: IState) => {
      this.user = r.user;
      this.error = r.error;
      this.isAuthenticated = r.isAuthenticated
    })
  }


  logout() {
    this.store.dispatch(new Logout());
  }

}