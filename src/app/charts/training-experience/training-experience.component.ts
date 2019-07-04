import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-training-experience',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './training-experience.component.html',
  styleUrls: ['./training-experience.component.css']
})
export class TrainingExperienceComponent implements OnInit {
  title = 'Bar Chart';

  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };

  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private feedBack: any = [];
  private trainingList: any = [];
  private result: any = [];
  private overallContent: any = [];
  private recommend: any = [];

  constructor(private httpService: HttpService) { }


  private groupByTraining() {
    this.result = this.feedBack.reduce(function (r, a) {
      r[a.training] = r[a.training] || [];
      r[a.training].push(a);
      return r;
    }, []);
    this.getTrainingList();

  }





  private drawGraph() {
    this.initSvg('#svg1', this.overallContent);
    this.initSvg('#svg2', this.recommend);
  }

  ngOnInit() {
    this.httpService.getList().subscribe(response => {
      console.log(response);
      this.feedBack = response as [];
      this.getOverall();
      this.groupByTraining();
      
    });


  }

  private getOverall(){
    var rsum = 0;
    var osum = 0;
    var asum = 0;
    var exsum = 0;
      for(var i =0;i<this.feedBack.length;i++){
        rsum = rsum + parseInt(this.feedBack[i].questions[7].subquestions[0].rating);
        osum = osum + parseInt(this.feedBack[i].questions[7].subquestions[1].rating);
        asum = rsum + parseInt(this.feedBack[i].questions[7].subquestions[2].rating);
        exsum = rsum + parseInt(this.feedBack[i].questions[7].subquestions[3].rating);
      }

      rsum = rsum / this.feedBack.length;
      osum = osum / this.feedBack.length;
      asum = asum / this.feedBack.length;
      exsum = exsum / this.feedBack.length;

      this.overallContent.push({ "Training": this.feedBack[0].questions[7].subquestions[0].sub_ques, "Rating": rsum.toFixed(2) });
      this.overallContent.push({ "Training": this.feedBack[0].questions[7].subquestions[1].sub_ques, "Rating": osum.toFixed(2) });
      this.overallContent.push({ "Training": this.feedBack[0].questions[7].subquestions[2].sub_ques, "Rating": asum.toFixed(2) });
      this.overallContent.push({ "Training": this.feedBack[0].questions[7].subquestions[3].sub_ques, "Rating": exsum.toFixed(2) });
      console.log(this.overallContent);
  }

  private getTrainingList() {
    this.httpService.getTrainingNameList().subscribe(response => {
      console.log(response);
      this.trainingList = response as [];

      for (let i = 0; i < this.trainingList.length; i++) {
        if (this.result[this.trainingList[i].training] != undefined) {
          var sum = 0;
          for (let j = 0; j < this.result[this.trainingList[i].training].length; j++) {
            sum = sum + parseInt(this.result[this.trainingList[i].training][j].questions[7].subquestions[0].rating);
          }

          sum = sum / this.result[this.trainingList[i].training].length;
          this.recommend.push({ "Training": this.trainingList[i].training, "Rating": sum.toFixed(2) });



        }
      }

      this.drawGraph();
    });


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
    this.x.domain(data.map((d) => d.Training));
    this.y.domain([0, 5]);
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
      .attr('x', (d) => this.x(d.Training))
      .attr('y', (d) => this.y(d.Rating))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.Rating));
  }
}
