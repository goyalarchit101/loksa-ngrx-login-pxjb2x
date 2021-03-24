import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';
import { HomeComponent } from './components/home/home.component';



const routes: Route[] = [
  {
    path: 'login', component: LogInComponent,
  },
  {
    path: 'register', component: SignUpComponent
  },
   {
    path: 'home', component: HomeComponent
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }
]


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers,{}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot(routes)
  ],
  declarations: [ AppComponent, HelloComponent, LogInComponent, SignUpComponent, HomeComponent ],
  bootstrap:    [ AppComponent],
  providers: [AuthService]
})
export class AppModule { }
