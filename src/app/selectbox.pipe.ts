import { Component, NgModule, Pipe, PipeTransform } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Pipe({
    name: 'selectbox'
})

export class SelectboxPipe implements PipeTransform {
    transform(opt: any, sel?: any): any {
        // for(var i =0;i<opt.length;i++){
            return (opt ) ? opt.filter(sal => {
                if(sal.training == sel || sel == undefined){
                    return sal;
                } 
                
            }) : opt;
               }
}
