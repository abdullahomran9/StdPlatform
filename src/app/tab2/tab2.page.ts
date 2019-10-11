import { Component } from '@angular/core';
import {ServiceService }from '../service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public items =this.serviceservice.CrsHst.Course;
  constructor(private serviceservice : ServiceService) {}

}
