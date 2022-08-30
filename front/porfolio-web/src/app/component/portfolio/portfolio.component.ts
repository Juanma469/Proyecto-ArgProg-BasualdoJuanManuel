import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor() { }


  irA(ele: any) {
    ele.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }





  ngOnInit() {


  }


}