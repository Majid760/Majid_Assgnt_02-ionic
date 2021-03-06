import { Component, ViewChild} from '@angular/core';
import { NavController,IonSlides ,LoadingController} from '@ionic/angular';
import {OnInit } from '@angular/core';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { DataService } from '../services/data.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.page.html',
  styleUrls: ['./app-list.page.scss'],
})
export class AppListPage implements OnInit {


  userId:string;
  books:any[]=[];

  bookss:any[]=[];
  
  constructor(private navCtrl:NavController,private dataService:DataService,private loadingCtrl:LoadingController) {
    this.userId=firebase.auth().currentUser.uid;
    this.getBooks();

    this.bookss=this.dataService.getBooks();

    this.loading();
   }

  

  public images:any;
  @ViewChild('slider', {static: false}) slider: IonSlides;
  page=0;

  selectedTab(index){
    this.slider.slideTo(index);
  }




  ngOnInit() {
  }

  async loading(){

    let loading=await this.loadingCtrl.create({
      message:"loading...",
      duration:1000,
      showBackdrop:false,
      // spinner:"dots"
      spinner:"bubbles"
      // spinner:"circles"
      // spinner:"crescent"
        //  spinner:"circular"
    
    })
    loading.present();
  }

  gotoAdd(){
    
    this.loading();
    this.navCtrl.navigateForward(['add-book']);
    // this.navCtrl.navigateRoot(['add-book']);

  }


  getBooks(){
    
    firebase.firestore().collection("books").where("owner","==",this.userId).onSnapshot((querySnapshot)=>{
      this.books=querySnapshot.docs;
    });
  }
  
  gotoDetail(index){
    this.navCtrl.navigateForward("detail/"+index);
  }
  

}
