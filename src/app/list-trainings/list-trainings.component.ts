import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { AddTrainingComponent } from '../list-trainings/add-training/add-training.component';
import { MatDialog,  MatDialogConfig, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-list-trainings',
  templateUrl: './list-trainings.component.html',
  styleUrls: ['./list-trainings.component.css']
})
export class ListTrainingsComponent implements OnInit {
  isPopupOpened = true;
  TrainingList = [];
  constructor(private httpService: HttpService, private dialog: MatDialog) { }
  dialogRef: MatDialogRef<AddTrainingComponent>;
  ngOnInit() {
    this.httpService.getTrainingList().subscribe(response => {
      console.log(response);
      this.TrainingList = response as [];
    });


  }
  addTraining() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(AddTrainingComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  editTraining(id: number) {
    this.isPopupOpened = true;
    const training = this.TrainingList.find(c => c.id === id);
    const dialogRef = this.dialog.open(AddTrainingComponent, {
      data: training
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

}
