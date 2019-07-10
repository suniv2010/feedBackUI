import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'feedbackForm';
  constructor(public router: Router) {
  }

  ngOnInit(){
    console.log(this.router.url);
  }
}
