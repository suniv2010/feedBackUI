import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-training-qualification',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './training-qualification.component.html',
  styleUrls: ['./training-qualification.component.css']
})
export class TrainingQualificationComponent implements OnInit {

  title = 'Bar Chart';

  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private feedBack: any = [];
  private trainerList: any = [];
  private result: any = [];
  private overallTrainerQualification: any = [];
  private presentation: any = [];
  private understandibility: any = [];
  private productExpertise: any = [];
  private Interaction: any = [];

  constructor(private httpService: HttpService) {}


  private groupByTrainers() {
      this.result = this.feedBack.reduce(function (r, a) {
          r[a.trainers] = r[a.trainers] || [];
          r[a.trainers].push(a);
          return r;
      }, []);
      console.log(this.result);
      this.getTrainersList();
  }

  private drawGraph() {
      this.initSvg('#svg1', this.overallTrainerQualification);
      this.initSvg('#svg2', this.presentation);
      this.initSvg('#svg3', this.understandibility);
      this.initSvg('#svg4', this.productExpertise);
      this.initSvg('#svg5', this.Interaction);
  }

  ngOnInit() {
      this.httpService.getList().subscribe(response => {
          console.log(response);
          this.feedBack = response as [];
          this.groupByTrainers();
        });
  }

  private getTrainersList() {

      for(var obj in this.result)
      {
          
          var psum = 0;
          var usum = 0;
          var pdtExpsum = 0;
          var Isum = 0;
           for(let j=0;j<this.result[obj].length;j++){
               psum = psum + parseInt(this.result[obj][j].questions[1].subquestions[0].rating);
               usum = usum + parseInt(this.result[obj][j].questions[1].subquestions[1].rating);
               pdtExpsum = pdtExpsum + parseInt(this.result[obj][j].questions[1].subquestions[2].rating);
               Isum = Isum + parseInt(this.result[obj][j].questions[1].subquestions[3].rating);
           }

           psum = psum/this.result[obj].length;
           usum = usum/this.result[obj].length;
           pdtExpsum = pdtExpsum/this.result[obj].length;
           Isum = Isum/this.result[obj].length;
           this.presentation.push({"Trainers": obj,"Rating":psum.toFixed(2)});
           this.understandibility.push({"Trainers": obj,"Rating":usum.toFixed(2)});
           this.productExpertise.push({"Trainers": obj,"Rating":pdtExpsum.toFixed(2)});
           this.Interaction.push({"Trainers": obj,"Rating":Isum.toFixed(2)});

           var overallrating = (psum+usum+pdtExpsum+Isum)/4;

           this.overallTrainerQualification.push({"Trainers": obj,"Rating":overallrating.toFixed(2)});

      }
          
console.log(this.presentation);
this.drawGraph();

        
  }

  

  private initSvg(svgid, data) {
      this.svg = d3.select(svgid);
      this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
      this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
      this.g = this.svg.append('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
          this.initAxis(data);
  }

  private initAxis(data) {
      this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
      this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
      this.x.domain(data.map((d) => d.Trainers));
      this.y.domain([0, d3Array.max(data, (d) => d["Rating"])]);
      this.drawAxis(data);
  }

  private drawAxis(data) {
      this.g.append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3Axis.axisBottom(this.x));

      this.g.append('g')
          .attr('class', 'axis axis--y')
          .call(d3Axis.axisLeft(this.y))
          .append('text')
          .attr('class', 'axis-title')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Rating');

          
      this.drawBars(data);
  }

  private drawBars(data) {
      this.g.selectAll('.bar')
          .data(data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => this.x(d.Trainers) )
          .attr('y', (d) => this.y(d.Rating) )
          .attr('width', 50)
          .attr('height', (d) => this.height - this.y(d.Rating));
  }
}
