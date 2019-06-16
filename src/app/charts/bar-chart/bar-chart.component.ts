import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { HttpService } from 'src/app/shared/http.service';

@Component({
    selector: 'app-bar-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

    title = 'Bar Chart';

    private width: number;
    private height: number;
    private margin = {top: 20, right: 20, bottom: 30, left: 40};

    private x: any;
    private y: any;
    private svg: any;
    private g: any;
    private feedBack: any = [];
    private trainingList: any = [];
    private result: any = [];
    private overallContent: any = [];
    private quality: any = [];
    private value: any = [];
    private relevance: any = [];
    private logicalStructure: any = [];

    constructor(private httpService: HttpService) {}


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
        this.initSvg('#svg2', this.quality);
        this.initSvg('#svg3', this.value);
        this.initSvg('#svg4', this.relevance);
        this.initSvg('#svg5', this.logicalStructure);
    }

    ngOnInit() {
        this.httpService.getList().subscribe(response => {
            console.log(response);
            this.feedBack = response as [];
            this.groupByTraining();
          });

        
    }

    private getTrainingList() {
        this.httpService.getTrainingNameList().subscribe(response => {
            console.log(response);
            this.trainingList = response as [];

            for(let i=0;i<this.trainingList.length;i++){
               if(this.result[this.trainingList[i].training] != undefined){
                   var qsum = 0;
                   var vsum = 0;
                   var rsum = 0;
                   var lsum = 0;
                    for(let j=0;j<this.result[this.trainingList[i].training].length;j++){
                        qsum = qsum + parseInt(this.result[this.trainingList[i].training][j].questions[0].subquestions[0].rating);
                        vsum = vsum + parseInt(this.result[this.trainingList[i].training][j].questions[0].subquestions[1].rating);
                        rsum = rsum + parseInt(this.result[this.trainingList[i].training][j].questions[0].subquestions[2].rating);
                        lsum = lsum + parseInt(this.result[this.trainingList[i].training][j].questions[0].subquestions[3].rating);
                    }

                    qsum = qsum/this.result[this.trainingList[i].training].length;
                    vsum = vsum/this.result[this.trainingList[i].training].length;
                    rsum = rsum/this.result[this.trainingList[i].training].length;
                    lsum = lsum/this.result[this.trainingList[i].training].length;
                    this.quality.push({"Training": this.trainingList[i].training,"Rating":qsum.toFixed(2)});
                    this.value.push({"Training": this.trainingList[i].training,"Rating":vsum.toFixed(2)});
                    this.relevance.push({"Training": this.trainingList[i].training,"Rating":rsum.toFixed(2)});
                    this.logicalStructure.push({"Training": this.trainingList[i].training,"Rating":lsum.toFixed(2)});

                    var overallrating = (qsum+vsum+rsum+lsum)/4;

                    this.overallContent.push({"Training": this.trainingList[i].training,"Rating":overallrating.toFixed(2)});



               }
               
            }
            
console.log(this.overallContent);
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
            .attr('x', (d) => this.x(d.Training) )
            .attr('y', (d) => this.y(d.Rating) )
            .attr('width', 50)
            .attr('height', (d) => this.height - this.y(d.Rating));
    }
}