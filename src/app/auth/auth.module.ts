import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AlertComponent } from '../shared/alert/alert.component';



@NgModule({
  declarations: [AuthComponent, SignupComponent , AlertComponent],
  imports: [CommonModule , FormsModule , RouterModule.forChild(
    [{path: '', component: AuthComponent},
     {path: 'signup' , component: SignupComponent}]
  )]
})

export class AuthModule {}
