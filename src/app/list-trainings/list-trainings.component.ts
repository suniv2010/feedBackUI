import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-list-trainings',
  templateUrl: './list-trainings.component.html',
  styleUrls: ['./list-trainings.component.css']
})
export class ListTrainingsComponent implements OnInit {

  TrainingList = [];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getTrainingList().subscribe(response => {
      console.log(response);
      this.TrainingList = response as [];
    });


  }

}
