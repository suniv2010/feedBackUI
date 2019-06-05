import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get('https://feedback-eb.herokuapp.com/feedback/list');
  }
  sendFeedback(payLoad): Observable<any> {
    return this.http
      .post<any>('https://feedback-eb.herokuapp.com/feedback/create', payLoad,
        { headers: headers, observe: 'response' }).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }
  createTraining(trainingdetails): Observable<any> {
    return this.http
      .post<any>('https://feedback-eb.herokuapp.com/trainingdetails/add', trainingdetails,
        { headers: headers, observe: 'response'}).pipe(
          tap(e => {
            // this.routeToList(e);
          })
        );
  }

  editTraining(trainingId) {
    return this.http.get('https://feedback-eb.herokuapp.com/trainingdetails/edit/' + trainingId);
  }
  updateTraining(trainingData) {
    console.log(trainingData)
    return this.http.get('https://feedback-eb.herokuapp.com/trainingdetails/update/' + trainingData.id);
  }
  deleteTraining(trainingId) {
    return this.http.get('https://feedback-eb.herokuapp.com/trainingdetails/delete/' + trainingId);
  }

  
  
  getTrainingNameList() {
    return this.http.get('https://feedback-eb.herokuapp.com/trainingnames/list');
  }
  getTrainerNameList() {
    return this.http.get('https://feedback-eb.herokuapp.com/trainernames/list');
  }
  getTrainingList() {
    return this.http.get('https://feedback-eb.herokuapp.com/trainingdetails/list');
  }
  getTrainingDetails(trainingId) {
    return this.http.get('https://feedback-eb.herokuapp.com/trainingdetails/details/' + trainingId);
  }
}

