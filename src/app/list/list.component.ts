import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import {ExcelService} from '../services/excel.services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  feedBackList = [];
  feedBackListTabulated = [];
  feedbackWholeData = [];
  trainingList = [];
  selectedValue = undefined;
  constructor(private httpService: HttpService, private excelService: ExcelService) {}

   updateSelectedValue(event: string): void{
    // this.selectedValue = event;
    // console.log(this.selectedValue);
  }

  ngOnInit() {
    this.httpService.getList().subscribe(response => {
      console.log(response);
      this.feedBackListTabulated = response as [];
      // this.feedBackListTabulated.pop();
      // console.log(this.feedBackListTabulated);
      // console.log(this.feedbackWholeData);
    });

    this.httpService.getList().subscribe(response => {
      console.log(response);
      this.feedBackList = response as [];
    });

 this.httpService.getTrainingNameList().subscribe(response => {
        console.log(response);
        this.trainingList = response as [];
      });

  }




  exportAsXLSX():void {
    this.httpService.getList().subscribe(response => {
      // console.log(response);
      this.feedBackList = response as [];
    });


    if(this.selectedValue !== undefined){
      for(var i =0; i<this.feedBackList.length; i++){

        if(this.feedBackList[i].training !== this.selectedValue){
            console.log(this.feedBackList[i].training);

            console.log(this.selectedValue);
          this.feedBackList.splice(i, 1);
        }
      }
      console.log(this.feedBackList);
    }


    for(var i =0; i<this.feedBackList.length; i++){
      
      var question_json = {};
      // console.log(i);
      
      
      for(var j = 0;j< this.feedBackList[i].questions.length; j++){
        if(this.feedBackList[i].questions[j].question_type == "rating"){          
          for(var k = 0;k< this.feedBackList[i].questions[j].subquestions.length; k++){
            question_json[this.feedBackList[i].questions[j].subquestions[k].sub_ques+"(rating)"] = this.feedBackList[i].questions[j].subquestions[k].rating;
            question_json[this.feedBackList[i].questions[j].subquestions[k].sub_ques+"(comment)"] = this.feedBackList[i].questions[j].subquestions[k].comments;
          }         
        }
        else if(this.feedBackList[i].questions[j].question_type == "yes or No"){
          question_json[this.feedBackList[i].questions[j].question] = this.feedBackList[i].questions[j].answer;
          question_json[this.feedBackList[i].questions[j].subquestions[0].sub_ques] = this.feedBackList[i].questions[j].subquestions[0].comments;
        }
        else{
          question_json[this.feedBackList[i].questions[j].question] = this.feedBackList[i].questions[j].answer;
        }
      }
     delete this.feedBackList[i].questions; 
    Object.assign(this.feedBackList[i], question_json); 

    }

      console.log(question_json);

    console.log(this.feedBackList);
    this.excelService.exportAsExcelFile(this.feedBackList, 'feedback');
  }

}
