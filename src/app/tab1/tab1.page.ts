import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ServiceService }from '../service.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data1;
  xx;
  public Head = {
    SubNm: [],
    AbbPrs: [],
    AbbNum: [],
    CatNbr :[],
    CourseTitle:[]
  };
  public items: any = [];

  constructor(public activatedRoute : ActivatedRoute,private serviceservice : ServiceService) {
    for (let xxx =0 ; xxx < this.serviceservice.lengthofabs; xxx++) {
      this.items[xxx]={expanded: false };
      this.Head.SubNm[xxx]=this.serviceservice.Att.SubNm[xxx];
      this.Head.AbbPrs[xxx]=this.serviceservice.Att.AbbPrs[xxx];
      this.Head.AbbNum[xxx]=this.serviceservice.Att.AbbNum[xxx];
      this.Head.CatNbr[xxx]=this.serviceservice.Att.CatNbr[xxx];
      this.Head.CourseTitle[xxx]=this.serviceservice.Att.CourseTitle[xxx];

    };
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

}
