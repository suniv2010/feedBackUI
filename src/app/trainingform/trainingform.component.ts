import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray
} from '@angular/forms';
import {
  HttpService
} from '../shared/http.service';
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-trainingform',
  templateUrl: './trainingform.component.html',
  styleUrls: ['./trainingform.component.css']
})
export class TrainingformComponent implements OnInit {

  trainingform = '';
  public href = '';
  TrainingDetails = {};
  trainingName = '';
  trainerNames = '';
  trainingLocation = '';
  trainingDate = '';
  submitted = false;
  trainersPresentationRatingArr = [];
  trainersUnderstandabilityRatingArr = [];
  trainersExpertiseRatingArr = [];
  trainersInteractionRatingArr = [];
  presentation_sum = 0;
  understanding_sum = 0;
  expertise_sum = 0;
  interaction_sum = 0;
  p_rating = false;
  u_rating = false;
  e_rating = false;
  i_rating =false;

  form = this.fb.group({
    participantName: this.fb.group({

      id_name: [''],
    }),
    training_n: this.fb.group({

      training_name: [''],
    }),
    trainer_n: this.fb.group({

      trainer_names: [''],
    }),
    training_location: this.fb.group({

      location_name: [''],
    }),
    training_date: this.fb.group({

      t_date: [''],
    }),
    question_1: this.fb.group({
      
      quality: ['', Validators.required],
      quality_comment: [''],
      value: ['', Validators.required],
      value_comment: [''],
      relevance: ['', Validators.required],
      relevance_comment: [''],
      logic: ['', Validators.required],
      logic_comment: ['']
    }),
    question_2: this.fb.group({
      presentation: [''],
      presentation_comment: [''],
      understanding: [''],
      understanding_comment: [''],
      expertise: [''],
      expertise_comment: [''],
      interaction: [''],
      interaction_comment: ['']
    }),
    question_3: this.fb.group({
      expectations: ['', Validators.required],
      expectations_comment: ['', Validators.required],
    }),
    question_4: this.fb.group({

      valuable_comment: ['', Validators.required],
    }),
    question_5: this.fb.group({

      missing_comment: ['', Validators.required],
    }),
    question_6: this.fb.group({

      duration_comment: ['', Validators.required],
    }),
    question_7: this.fb.group({

      product_comment: ['', Validators.required],
    }),
    question_8: this.fb.group({
      recommendation: ['', Validators.required],
      recommendation_comment: [''],
      organization: ['', Validators.required],
      organization_comment: [''],
      applicability: ['', Validators.required],
      applicability_comment: [''],
      experience: ['', Validators.required],
      experience_comment: ['']
    }),
    question_9: this.fb.group({
      satisfaction_comment: ['', Validators.required],
    })
  });
  constructor(private fb: FormBuilder, private httpService: HttpService,
    private router: Router) {}

  ngOnInit() {
    // document.getElementById('main_hd').style.display = "none";
    this.href = this.router.url;
    this.trainingform = this.href.split("/").pop();
    console.log(this.trainingform);
    this.httpService.getTrainingDetails(this.trainingform).subscribe(response => {
      console.log(response);
      this.TrainingDetails = response as {};
      this.trainingName = this.TrainingDetails["training"];
      this.trainerNames = this.TrainingDetails["trainers"].toString();
      
      this.trainingLocation = this.TrainingDetails["location"];
      if (this.TrainingDetails["from_date"] == this.TrainingDetails["to_date"])
      {
        this.trainingDate = this.TrainingDetails["from_date"];
      }
      else{
        this.trainingDate =  this.TrainingDetails["from_date"] + " to " + this.TrainingDetails["to_date"]
      }

      for(var i =0;i<this.TrainingDetails["trainers"].length;i++){
        this.trainersPresentationRatingArr[i] = {"name":this.TrainingDetails["trainers"][i],"rating":0};
        this.trainersUnderstandabilityRatingArr[i] = {"name":this.TrainingDetails["trainers"][i],"rating":0};
        this.trainersExpertiseRatingArr[i] = {"name":this.TrainingDetails["trainers"][i],"rating":0};
        this.trainersInteractionRatingArr[i] = {"name":this.TrainingDetails["trainers"][i],"rating":0};      
      }
      
    });
  }

  onSubmit() {
    this.submitted = true;
    this.p_rating = false;
    this.u_rating = false;
    this.e_rating = false;
    this.i_rating = false;

    for(var i = 0; i < this.trainersPresentationRatingArr.length; i++){

      if(this.trainersPresentationRatingArr[i]["rating"]==0 && this.p_rating == false){
        this.p_rating = true;
      }
      if(this.trainersUnderstandabilityRatingArr[i]["rating"]==0 && this.u_rating == false){
        this.u_rating = true;
      }
      if(this.trainersExpertiseRatingArr[i]["rating"]==0 && this.e_rating == false){
        this.e_rating = true;
      }
      if(this.trainersInteractionRatingArr[i]["rating"]==0 && this.i_rating == false){
        this.i_rating = true;
      }
    }

    console.log(JSON.stringify(this.form.value));
    if(this.form.valid && this.p_rating == false && this.u_rating == false && this.e_rating == false && this.i_rating == false){
      this.convertResponseToPost(this.form.value);
      console.log("success");
    }
    
  }

  handleChange(evt,index,topic){ 
    console.log(topic);
    if(topic == 'presentation'){
      this.trainersPresentationRatingArr[index]["rating"] = parseInt(evt.target.value);
      console.log(this.trainersPresentationRatingArr[index]["rating"]);
    }
    else if(topic == 'understanding'){
      this.trainersUnderstandabilityRatingArr[index]["rating"] = parseInt(evt.target.value);
    }
    else if(topic == 'expertise'){
      this.trainersExpertiseRatingArr[index]["rating"] = parseInt(evt.target.value);
    }
    else{
      this.trainersInteractionRatingArr[index]["rating"] = parseInt(evt.target.value);
    }

    this.presentation_sum = 0;
    this.understanding_sum = 0;
    this.expertise_sum = 0;
    this.interaction_sum = 0;
    this.p_rating = false;
    this.u_rating = false;
    this.e_rating = false;
    this.i_rating = false;

    for(var i = 0; i < this.trainersPresentationRatingArr.length; i++){
      this.presentation_sum += this.trainersPresentationRatingArr[i]["rating"];
      this.understanding_sum += this.trainersUnderstandabilityRatingArr[i]["rating"];
      this.expertise_sum += this.trainersExpertiseRatingArr[i]["rating"];
      this.interaction_sum += this.trainersInteractionRatingArr[i]["rating"];

      if(this.trainersPresentationRatingArr[i]["rating"]==0 && this.p_rating == false){
        this.p_rating = true;
      }
      if(this.trainersUnderstandabilityRatingArr[i]["rating"]==0 && this.u_rating == false){
        this.u_rating = true;
      }
      if(this.trainersExpertiseRatingArr[i]["rating"]==0 && this.e_rating == false){
        this.e_rating = true;
      }
      if(this.trainersInteractionRatingArr[i]["rating"]==0 && this.i_rating == false){
        this.i_rating = true;
      }
    }

    this.presentation_sum = this.presentation_sum/this.trainersPresentationRatingArr.length;
    this.understanding_sum = this.understanding_sum/this.trainersPresentationRatingArr.length;
    this.expertise_sum = this.expertise_sum/this.trainersPresentationRatingArr.length;
    this.interaction_sum = this.interaction_sum/this.trainersPresentationRatingArr.length;

   
} 
  convertResponseToPost(formValue) {

    const finalResponse = {
      "name": this.form.controls['participantName'].value.id_name,
      "training": this.trainingName,
      "trainers": this.trainerNames,
      "location": this.trainingLocation,
      "date": this.trainingDate,
      "questions": [{
          "question": "How would you rate the quality of the training with regards to its contents?",
          "question_type": "rating",
          "answer": "",
          "comments": "",
          "subquestions": [{
              "sub_ques": "Quality of content",
              "rating": this.form.controls['question_1'].value.quality,
              "comments": this.form.controls['question_1'].value.quality_comment
            },
            {
              "sub_ques": "Value of content for you",
              "rating": this.form.controls['question_1'].value.value,
              "comments": this.form.controls['question_1'].value.value_comment
            },
            {
              "sub_ques": "Relevance of exercises",
              "rating": this.form.controls['question_1'].value.relevance,
              "comments": this.form.controls['question_1'].value.relevance_comment
            },
            {
              "sub_ques": "Logical structure and comprehensibility",
              "rating": this.form.controls['question_1'].value.logic,
              "comments": this.form.controls['question_1'].value.logic_comment
            }
          ]
        },
        {
          "question": "How would you rate the quality of the training with regards to the trainer?",
          "question_type": "rating",
          "answer": "",
          "comments": "",
          "subquestions": [{
              "sub_ques": "Presentation Skills",
              "rating": this.presentation_sum,
              "comments": this.form.controls['question_2'].value.presentation_comment,
              "trainerrating":this.trainersPresentationRatingArr
            },
            {
              "sub_ques": "Understandability of Explanations",
              "rating": this.understanding_sum,
              "comments": this.form.controls['question_2'].value.understanding_comment,
              "trainerrating":this.trainersUnderstandabilityRatingArr
            },
            {
              "sub_ques": "Product expertise",
              "rating": this.expertise_sum,
              "comments": this.form.controls['question_2'].value.expertise_comment,
              "trainerrating":this.trainersExpertiseRatingArr
            },
            {
              "sub_ques": "Interaction with Participants",
              "rating": this.interaction_sum,
              "comments": this.form.controls['question_2'].value.interaction_comment,
              "trainerrating":this.trainersInteractionRatingArr
            }
          ]
        },
        {
          "question": "Did the training meet your expectations?",
          "question_type": "yes or No",
          "answer": this.form.controls['question_3'].value.expectations,
          "comments": "",
          "subquestions": [{
            "sub_ques": "If yes, what did you like most? If no, where could improvements be made?",
            "rating": "",
            "comments": this.form.controls['question_3'].value.expectations_comment
          }]
        },
        {
          "question": "Which was the most valuable part of the training?",
          "question_type": "",
          "answer": this.form.controls['question_4'].value.valuable_comment,
          "comments": "",
          "subquestions": []
        },
        {
          "question": "Which topics were missing in the training?",
          "question_type": "",
          "answer": this.form.controls['question_5'].value.missing_comment,
          "comments": "",
          "subquestions": []
        },
        {
          "question": "How long did you already work with EB Product (Months r Years)",
          "question_type": "",
          "answer": this.form.controls['question_6'].value.duration_comment,
          "comments": "",
          "subquestions": []
        },
        {
          "question": "For which tasks do you use product?",
          "question_type": "",
          "answer": this.form.controls['question_7'].value.product_comment,
          "comments": "",
          "subquestions": []
        },
        {
          "question": "Your overall training experiences?",
          "question_type": "rating",
          "answer": "",
          "comments": "",
          "subquestions": [{
              "sub_ques": "Recommendation pf this training to others",
              "rating": this.form.controls['question_8'].value.recommendation,
              "comments": this.form.controls['question_8'].value.recommendation_comment
            },
            {
              "sub_ques": "Overall event organization",
              "rating": this.form.controls['question_8'].value.organization,
              "comments": this.form.controls['question_8'].value.organization_comment
            },
            {
              "sub_ques": "Applicability of what I learned",
              "rating": this.form.controls['question_8'].value.applicability,
              "comments": this.form.controls['question_8'].value.applicability_comment
            },
            {
              "sub_ques": "Overall training experience",
              "rating": this.form.controls['question_8'].value.experience,
              "comments": this.form.controls['question_8'].value.experience_comment,
            }
          ]
        },
        {
          "question": "Are you satisfied with the training? We welcome your testimonial statement?",
          "question_type": "",
          "answer": this.form.controls['question_9'].value.satisfaction_comment,
          "comments": "",
          "subquestions": []
        }

      ]
    }
    console.log(finalResponse);
    this.makeApiCall(finalResponse);
  }
  makeApiCall(payload) {
    this.httpService.sendFeedback(payload).subscribe(a => {
      console.log(a);
      if (a.status === 200) {
        this.router.navigate(['success']);
      } else {
        alert("Some Error Occured. Please Try Again!");
      }
    });
  }

}
