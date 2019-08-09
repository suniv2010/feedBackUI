import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import {HttpService} from 'src/app/shared/http.service';

@Component(
    {selector: 'app-trainer-qualification', encapsulation: ViewEncapsulation.None, templateUrl: './trainer-qualification.component.html', styleUrls: ['./trainer-qualification.component.css']}
)
export class TrainerQualificationComponent implements OnInit {

    title = 'Bar Chart';

    private width: number;
    private height: number;
    private margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };

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
    private final_prestationArr: any = [];
    private final_overallTrainerQualification: any = [];
    private final_understandibility: any = [];
    private final_productExpertise: any = [];
    private final_Interaction: any = [];

    constructor(private httpService : HttpService) {}

    private groupByTrainers() {
        this.result = this
            .feedBack
            .reduce(function (r, a) {
                r[a.trainers] = r[a.trainers] || [];
                r[a.trainers].push(a);
                return r;
            }, []);
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
        this
            .httpService
            .getList()
            .subscribe(response => {
                this.feedBack = response as[];
                this.groupByTrainers();
            });
    }

    private getTrainersList() {

        for (var obj in this.result) {

            for (let j = 0; j < this.result[obj].length; j++) {
                if (this.result[obj][j].questions[1].subquestions[0].trainerrating != undefined) {
                    for (
                        let k = 0;
                        k < this.result[obj][j].questions[1].subquestions[0].trainerrating.length;
                        k++
                    ) {
                        this
                            .presentation
                            .push(this.result[obj][j].questions[1].subquestions[0].trainerrating[k]);
                        this
                            .understandibility
                            .push(this.result[obj][j].questions[1].subquestions[1].trainerrating[k]);
                        this
                            .productExpertise
                            .push(this.result[obj][j].questions[1].subquestions[2].trainerrating[k]);
                        this
                            .Interaction
                            .push(this.result[obj][j].questions[1].subquestions[3].trainerrating[k]);
                    }

                }

            }

        }

        this.reduceArray(this.presentation, 2);
        this.reduceArray(this.understandibility, 3);
        this.reduceArray(this.productExpertise, 4);
        this.reduceArray(this.Interaction, 5);
        this.reduceArray(this.overallTrainerQualification,1);

  
    }

    private reduceArray(dataArr, svgId) {

        var result = [];
        var tempCountArray = [];
        dataArr.reduce(function (res, value) {

            if (!res[value.name]) {
                res[value.name] = {
                    name: value.name,
                    rating: 0
                };
                result.push(res[value.name]);
                tempCountArray[value.name] = 0;
            }
            tempCountArray[value.name]++;
            res[value.name].rating = parseFloat(res[value.name].rating) + parseFloat(value.rating);
            return res;
        }, {});

       

        for (let i = 0; i < result.length; i++) {
          if(svgId != 1){
            result[i]["rating"] = (result[i]["rating"] / tempCountArray[result[i]["name"]]).toFixed(2);
             
                this.overallTrainerQualification.push(result[i]);
              }
              else{
                result[i]["rating"] = (result[i]["rating"] / 4).toFixed(2);
              }
              
        }


        if(svgId == 1){
          console.log(result);
                }
        this.initSvg('#svg' + svgId, result);
       
    }

    private initSvg(svgid, data) {
        this.svg = d3.select(svgid);
        this.width = +this
            .svg
            .attr('width') - this.margin.left - this.margin.right;
        this.height = +this
            .svg
            .attr('height') - this.margin.top - this.margin.bottom;
        this.g = this
            .svg
            .append('g')
            .attr(
                'transform',
                'translate(' + this.margin.left + ',' + this.margin.top + ')'
            );
        this.initAxis(data);
    }

    private initAxis(data) {
        this.x = d3Scale
            .scaleBand()
            .rangeRound([0, this.width])
            .padding(0.1);
        this.y = d3Scale
            .scaleLinear()
            .rangeRound([this.height, 0]);
        this
            .x
            .domain(data.map((d) => d.name));
        this
            .y
            .domain([0, 5]);
        this.drawAxis(data);
    }

    private drawAxis(data) {
        this
            .g
            .append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

        this
            .g
            .append('g')
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

        const div = d3
            .select("body")
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        this
            .g
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => this.x(d.name))
            .attr('y', (d) => this.y(d.rating))
            .attr('width', this.x.bandwidth())
            .attr('height', (d) => this.height - this.y(d.rating))
            .on('mouseover', (d) => {
                div.style('opacity', .9);
                div
                    .html('<b>Rating: </b>' + d.rating + '<br/><b>' + d.name + '</b>')
                    .style('left', (d3.event.pageX) + 'px')
                    .style('top', (d3.event.pageY - 28) + 'px');
            })
            .on('mouseout', (d) => {
                div.style('opacity', 0);
            });
    }
}
