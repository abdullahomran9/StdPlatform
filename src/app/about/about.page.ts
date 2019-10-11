import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public router : Router ) { }

  ngOnInit() {
  }
  gotomain(){
    this.router.navigate(['login']);
  }
}
