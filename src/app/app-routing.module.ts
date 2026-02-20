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
import { ShadowDomEncapsulationComponent } from './Encapsulation/shadow-dom-encapsulation/shadow-dom-encapsulation.component';
import { ReactiveFormExampleComponent } from './Forms/reactive-form-example/reactive-form-example.component';
import { GroupRowsComponent } from './group-rows/group-rows.component';
import { TestFormComponent } from './test-form/test-form.component';
import { PngTableComponent } from './png-table/png-table.component';
import { SaveRecordsBulkComponent } from './save-records-bulk/save-records-bulk.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './appdashboard/dashboard.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';

 


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'builtindirectives', component: BuiltinDirectivesComponent},
  {path: 'colFilter', component: MatTableColumnFilterComponent},
   
  {path:'storeExample', component: MyCounterComponent},
  {path: 'rxjs', component: RxJsOperatorsComponent},
  {path: 'encaps', component: ShadowDomEncapsulationComponent},
  {path: 'reactiveForm', component: ReactiveFormExampleComponent},
  {path: 'groupRows', component: GroupRowsComponent},
  {path:'test-form', component: TestFormComponent},
  {path:'png-table', component: PngTableComponent},
    {path:'bulk-save', component: SaveRecordsBulkComponent},
    {path:'csv-upload', component: CsvUploadComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
