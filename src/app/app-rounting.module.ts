import { Routes, RouterModule , PreloadAllModules } from '@angular/router';
import { CustomersModule } from './customers/customers.module';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { OrdersMoudle } from './orders/orders.module';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/customers/customers-list' , pathMatch: 'full'},
  {path: 'customers', loadChildren: () => import('./customers/customers.module').then ( m => CustomersModule)},
  {path: 'auth', loadChildren: () => import ('./auth/auth.module').then ( m => AuthModule)},
  {path: 'orders' , loadChildren: () => import ('./orders/orders.module').then ( m => OrdersMoudle)},
  {path: 'about', component: AboutComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRountingModule {}
