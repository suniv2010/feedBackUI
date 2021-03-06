import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { $ } from 'protractor';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent {

  trainingList = [];
  trainerList = [];
  TrainingList = [];
  trainingPopUp = false;
  trainerPopUp = false;

  training = this.fb.group({
    newTraining: this.fb.group({
      new_training: [this.data.newTraining],
    })
  });

  trainerForm = this.fb.group({
    newTainer: this.fb.group({
      new_trainer: [this.data.newTainer],
    })
  });

  form = this.fb.group({
    id: [this.data.id],

    training: this.fb.group({
      training_name: [this.data.training, Validators.required],
    }),
    trainers: this.fb.group({
      trainer_name: [this.data.trainers, Validators.required],
    }),
    location: this.fb.group({
      location_name: [this.data.location, Validators.required],
    }),
    sel_from_date: this.fb.group({
      from_date: [this.data.from_date, Validators.required],
    }),
    sel_to_date: this.fb.group({
      to_date: [this.data.to_date, Validators.required],
    }),
  });

  constructor(private fb: FormBuilder, private httpService: HttpService,
    private router: Router, public dialogRef: MatDialogRef<AddTrainingComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

    this.httpService.getTrainingNameList().subscribe(response => {
      console.log(response);
      this.trainingList = response as [];
    });
    this.httpService.getTrainerNameList().subscribe(response => {
      console.log(response);
      this.trainerList = response as [];
    });
  }

  onSubmit() {

    const finalResponse = {
      "id": this.data.id,
      "training": this.form.controls['training'].value.training_name,
      "trainers": this.form.controls['trainers'].value.trainer_name,
      "location": this.form.controls['location'].value.location_name,
      "from_date": this.form.controls['sel_from_date'].value.from_date,
      "to_date": this.form.controls['sel_to_date'].value.to_date,
    };
    console.log(this.data.id);
    if (!this.data.id) {
      this.httpService.createTraining(finalResponse)
        .subscribe(a => {
        }, error => {
          if (error.status == 200) {
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(result => {
              this.httpService.getTrainingList().subscribe(response => {
                console.log(response);
                this.TrainingList = response as [];
                window.location.reload();
              });
            });
          }
        });

    } else {
      this.httpService.updateTraining(finalResponse)
        .subscribe(a => {
        }, error => {
          if (error.status == 200) {
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(result => {
              this.httpService.getTrainingList().subscribe(response => {
                console.log(response);
                this.TrainingList = response as [];
                window.location.reload();
              });
            });
          }
        });
    }

  }

  showTrainingPopUp(){
    this.trainingPopUp = true;
  }

  showTrainerPopUp(){
    this.trainerPopUp = true;
  }


  addTraining(tr) {
    let trainingObj = {
      "training": this.training.controls['newTraining'].value.new_training
    };
    this.trainingPopUp = false;
    this.httpService.addTrainingName(trainingObj)
      .subscribe(a => {
        console.log(a);
      }, error => {
        if (error.status == 200) {

          this.httpService.getTrainingNameList().subscribe(response => {
            console.log(response);
            this.trainingList = response as [];
          });
        }
      });


  }
  addTrainer() {
    let trainerObj = {
      "trainers": this.trainerForm.controls['newTainer'].value.new_trainer
    };

    this.trainerPopUp = false;
    this.httpService.addTrainerName(trainerObj)
      .subscribe(a => {
        console.log(a);
      }, error => {
        if (error.status == 200) {

          this.httpService.getTrainerNameList().subscribe(response => {
            console.log(response);
            this.trainerList = response as [];
          });
        }
      });


  }


}