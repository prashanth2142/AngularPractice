import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { BuiltinDirectivesComponent } from './builtin-directives/builtin-directives.component';
import { MatTableColumnFilterComponent } from './mat-table-column-filter/mat-table-column-filter.component';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { RxJsOperatorsComponent } from './rx-js-operators/rx-js-operators.component';

 


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'builtindirectives', component: BuiltinDirectivesComponent},
  {path: 'colFilter', component: MatTableColumnFilterComponent},
   
  {path:'storeExample', component: MyCounterComponent},
  {path: 'rxjs', component: RxJsOperatorsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
