import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { ExcelService } from './services/excel.services';
import { CreatetrainingComponent } from './createtraining/createtraining.component';
import { ListTrainingsComponent } from './list-trainings/list-trainings.component';
import { TrainingformComponent } from './trainingform/trainingform.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SelectboxPipe } from './selectbox.pipe';

import { AddTrainingComponent } from './list-trainings/add-training/add-training.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule,MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule } from '@angular/material';

const routes: Routes = [
  { path: '', redirectTo: '/home' , pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'createtraining', component: CreatetrainingComponent },
  { path: 'traininglist', component: ListTrainingsComponent },
  { path: 'trainingform/:id', component: TrainingformComponent },
  { path: 'success', component: SuccessComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    SuccessComponent,
    CreatetrainingComponent,
    ListTrainingsComponent,
    TrainingformComponent,
    HomeComponent,
    SelectboxPipe,
    AddTrainingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,

  ],
  exports: [SelectboxPipe],
  providers: [ExcelService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddTrainingComponent
  ]
})
export class AppModule { }
