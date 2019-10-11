import { Component, OnInit } from '@angular/core';
import {ServiceService }from '../service.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {HTTP} from '@ionic-native/http/ngx'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private serviceservice : ServiceService,public activatedRoute : ActivatedRoute,
    private http : HTTP , public loadingController : LoadingController,public router : Router) { }
    loading: HTMLIonLoadingElement;
    parser= new DOMParser;
    parserDocument;
    username:any;
    password:string;
    public Att = {
      SubNm: [],
      AbbPrs: [],
      AbbNum: [],
      CatNbr :[],
      CourseTitle:[]
  };
  public data2;


  newfun(){
  this.serviceservice.login(this.username,this.password);
    
  }
  about(){
    this.router.navigate(['about']);
  }
  ngOnInit() {
  }

}
