import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

@Component({
    selector: 'app-pie-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

    title = 'Pie Chart';

    private margin = {top: 20, right: 20, bottom: 30, left: 50};
    private width: number;
    private height: number;
    private radius: number;

    private arc: any;
    private labelArc: any;
    private pie: any;
    private color: any;
    private svg: any;
    private feedBack: any = [];
    private YesNoCount: any = [];
    private yesCount = 0;
    private noCount = 0;
    private comment: any = [];

    constructor(private httpService: HttpService) {
        this.width = 400 - this.margin.left - this.margin.right;
        this.height = 400 - this.margin.top - this.margin.bottom;
        this.radius = Math.min(this.width, this.height) / 2;
    }

    ngOnInit() {

      this.httpService.getList().subscribe(response => {
        console.log(response);
        this.feedBack = response as [];
        this.generateRequiredData();
      });
    }

    private generateRequiredData(){

      for(let i=0; i<this.feedBack.length; i++){
          if(this.feedBack[i].questions[2].answer == 'yes'){
            this.yesCount++;
          } else{
            this.noCount++;
            if(this.feedBack[i].questions[2].subquestions[0].comments != "")
            {
                this.comment.push(this.feedBack[i].questions[2].subquestions[0].comments);
            }
          }
      }


      console.log(this.yesCount);
      console.log(this.comment);

     this.YesNoCount = [
        {value: 'Yes', count: this.yesCount},
        {value: 'No', count: this.noCount},
    ];
      this.initSvg();
      this.drawPie();
    }

    private initSvg() {
        this.color = d3Scale.scaleOrdinal()
            .range(['#00A200', '#777777']);
        this.arc = d3Shape.arc()
            .outerRadius(this.radius - 10)
            .innerRadius(0);
        this.labelArc = d3Shape.arc()
            .outerRadius(this.radius - 40)
            .innerRadius(this.radius - 40);
        this.pie = d3Shape.pie()
            .sort(null)
            .value((d: any) => d.count);
        this.svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
    }

    private drawPie() {
        let g = this.svg.selectAll('.arc')
            .data(this.pie(this.YesNoCount))
            .enter().append('g')
            .attr('class', 'arc');
        g.append('path').attr('d', this.arc)
            .style('fill', (d: any) => this.color(d.data.value) );
        g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
            .attr('dy', '.35em')
            .text((d: any) => d.data.value +"("+d.data.count+")");
    }

}
