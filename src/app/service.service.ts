import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {HTTP} from '@ionic-native/http/ngx'
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public alertController: AlertController ,private http : HTTP ,
     public loadingController : LoadingController,public router : Router ) { }
  loading: HTMLIonLoadingElement;
  parser= new DOMParser;
  parserDocument;
  parserDocument2;
  username:any;
  password:string;
  public Att = {
    SubNm: [],
    AbbPrs: [],
    AbbNum: [],
    CatNbr :[],
    CourseTitle:[]
};
  public CrsHst ={
    Course:[],
    Descrp:[],
    Term:[],
    Grade:[],
    Unit:[],
    Stat:[]
  };
public data2;
public data3;
public lengthofabs;

  async login(username,password) {
    this.username=username;
    this.password=password;
    let apiUrl = 'http://sis.rcyci.edu.sa/psp/ps/?&cmd=login&languageCd=ENG';
    try {
      this.loading = await this.loadingController.create({
        message: 'Please wait.',
      });
      await this.loading.present();

      const params = {
        userid: this.username,
        pwd: this.password,
        timezoneOffset: '-180',
      }
      console.log(params.userid+params.pwd);
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      }
      await this.http.disableRedirect(true);
      await this.http.post(apiUrl, params, headers);

      alert('Worng ID or Password');
      this.loading.dismiss();
    } catch (err) {
      let cookie = this.http.getCookieString(apiUrl);
      apiUrl = 'http://sis.rcyci.edu.sa/psp/ps/EMPLOYEE/HRMS/h/?tab=DEFAULT';
      let urlgrades='http://sis.rcyci.edu.sa/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES_2.SSS_MY_CRSEHIST.GBL?Page=SSS_MY_CRSEHIST&Action=U';
      let apiUrl2 = 'http://sis.rcyci.edu.sa/psc/ps/EMPLOYEE/HRMS/c/RCY_STD_ATTEND.RCY_STD_ATTEND.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.RCY_STD_ATTEND_GBL&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder&PortalActualURL=http%3a%2f%2fsis.rcyci.edu.sa%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fRCY_STD_ATTEND.RCY_STD_ATTEND.GBL&PortalContentURL=http%3a%2f%2fsis.rcyci.edu.sa%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fRCY_STD_ATTEND.RCY_STD_ATTEND.GBL&PortalContentProvider=HRMS&PortalCRefLabel=Absence%20Percentage&PortalRegistryName=EMPLOYEE&PortalServletURI=http%3a%2f%2fsis.rcyci.edu.sa%2fpsp%2fps%2f&PortalURI=http%3a%2f%2fsis.rcyci.edu.sa%2fpsc%2fps%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalKeyStruct=yes';
      const data: any = await this.http.get(apiUrl2, {responseType: 'text'}, {});
      console.log(data.data);
      this.data2=data.data;
      const Gradedata : any =await this.http.get(urlgrades, {responseType: 'text'}, {});
      this.data3=Gradedata.data;
      console.log(this.data3);
    }
      if (this.data2.indexOf(this.username)>=0 ){
        console.log("OK");
        this.parserDocument= this.parser.parseFromString(this.data2,"text/html");
        
        for (let i =0; i <= 7; i++) {
          try {
    
            console.log("Im in Try");
            this.Att.AbbNum[i]= this.parserDocument.getElementById("RCY_ATTEND_TBL_TOTAL_AMT$"+i).innerHTML;
            this.Att.AbbPrs[i] = this.parserDocument.getElementById("RCY_ATTEND_TBL_PERCENTAGE$"+i).innerHTML;
            this.Att.SubNm[i] = this.parserDocument.getElementById("RCY_ATTEND_TBL_SUBJECT$"+i).innerHTML;
            this.Att.CatNbr[i] = this.parserDocument.getElementById("RCY_ATTEND_TBL_CATALOG_NBR$"+i).innerHTML;
            this.Att.CourseTitle[i] = this.parserDocument.getElementById("RCY_ATTEND_TBL_DESCR$"+i).innerHTML;
            console.log(this.Att.AbbNum[i]);
            console.log(this.Att.AbbPrs[i]);
            console.log(this.Att.SubNm[i]);

            
          }
          catch(e){
            if(e instanceof RangeError){
              console.log('out of range');}
          }
        
        }
        this.parserDocument2= this.parser.parseFromString(this.data3,"text/html");

        for (let i =0; i <= 70; i++) {
          try {
          //console.log("Im in Try");
            this.CrsHst.Course[i]= this.parserDocument2.getElementById("CRSE_NAME$"+i).innerHTML;
            this.CrsHst.Descrp[i]= this.parserDocument2.getElementById("CRSE_LINK$"+i).innerHTML;
            this.CrsHst.Term[i]= this.parserDocument2.getElementById("CRSE_TERM$"+i).innerHTML;
            this.CrsHst.Grade[i]= this.parserDocument2.getElementById("CRSE_GRADE$"+i).innerHTML;
            this.CrsHst.Unit[i]= this.parserDocument2.getElementById("CRSE_UNITS$"+i).innerHTML;
            this.CrsHst.Stat[i]= this.parserDocument2.getElementById("win0divCRSE_STATUS$"+i).innerHTML;
            console.log(this.CrsHst.Course[i]);
          }
          catch(e){
            if(e instanceof RangeError){
              console.log('out of range');}
          }
  
        }
        this.lengthofabs=this.Att.SubNm.length;
        console.log(this.lengthofabs);
        this.loading.dismiss();
        this.router.navigate(['tabs/tab1']);
        
        }
        else {
          this.loading.dismiss();
          this.presentAlert();
        }
        
      }

      async presentAlert() {
        const alert = await this.alertController.create({
          header: 'Worng ID or Password',
          subHeader: '',
          message: 'Please enter ID and Password again',
          buttons: ['OK']
        });
    
        await alert.present();
      }

  login2(username,password){
    this.username=username;
    this.password=password;
    let x = this.password+this.username;
    return x;
  }
}
