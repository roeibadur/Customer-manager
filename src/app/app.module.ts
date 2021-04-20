import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeadersComponent } from './headers/headers.component';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { AppRountingModule } from './app-rounting.module';
import { CustomerEffects } from './customers/Store/customer.effects';
import { AuthEffects } from './auth/Store/auth.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownDirective } from './shared/dropDown.directive';
import * as fromApp from './Store/app.reducer';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    DropDownDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([CustomerEffects , AuthEffects]),
    AppRountingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
