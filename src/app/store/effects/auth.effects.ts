import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { AuthActionTypes, Login, LoginSuccess, LoginFailure } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {  
 
    @Effect()
    LoginIn: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: Login) => action.payload),
      switchMap(payload => {
        return this.authService.loginIn(payload).pipe(
          map((user: any) => {
            return new LoginSuccess({token: user.token, email: payload.email});
          }),
          catchError((error) => {
            return of(new LoginFailure({error}));
          })
        )
      })
    )
    @Effect({dispatch: false})
    LoginSuccess: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      tap((user) => {
        localStorage.setItem('token', user.payload.token);
        this.router.navigate(['home']);
      })
    )

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGIN_ERROR)
    );

    @Effect({dispatch: false})
    LogOut: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      })
    )



  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {

  }
}