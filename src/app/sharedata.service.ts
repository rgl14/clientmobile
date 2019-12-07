import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {
  fundSource: Observable<any>;
  private Funds: BehaviorSubject<any>;

  userdescriptionSource:Observable<any>;
  private userDescription:BehaviorSubject<any>;

  userdatasource:Observable<any>;
  private userData:BehaviorSubject<any>;

  HomesignalrDataSource:Observable<any>;
  private ClientSignalr:BehaviorSubject<any>;

  fancyExposureSource: Observable<any>;
  private currentFancyExposure: BehaviorSubject<any>;

  allMatchUnmatchBetsSource: Observable<any>;
  private currentAllMatchUnmatchBets: BehaviorSubject<any>

  matchedBetsSource: Observable<any>;
  private currentMatchedBets: BehaviorSubject<any>

  constructor() { 
    this.Funds = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.fundSource = this.Funds.asObservable();

    this.userDescription=<BehaviorSubject<any>>new BehaviorSubject(null); 
    this.userdescriptionSource=this.userDescription.asObservable();

    this.userData=<BehaviorSubject<any>>new BehaviorSubject(null);
    this.userdatasource=this.userData.asObservable();

    this.ClientSignalr=<BehaviorSubject<any>> new BehaviorSubject(null);
    this.HomesignalrDataSource=this.ClientSignalr.asObservable();

    this.currentFancyExposure = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.fancyExposureSource = this.currentFancyExposure.asObservable();

    this.currentAllMatchUnmatchBets = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.allMatchUnmatchBetsSource = this.currentAllMatchUnmatchBets.asObservable();

    this.currentMatchedBets = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.matchedBetsSource = this.currentMatchedBets.asObservable();
  }

  sharefundsdata(data: any) {
    this.Funds.next(data);
  }
  shareuserdescriptiondata(data:any){
    this.userDescription.next(data)
  }
  shareuserData(data:any){
    this.userData.next(data)
  }
  sharehomesignalrData(data:any){
    this.ClientSignalr.next(data);
  }
  shareFancyExposure(data: any) {
    this.currentFancyExposure.next(data);
  }
  shareAllMatchUnmatchBetsData(data: any) {
    this.currentAllMatchUnmatchBets.next(data);
  }
  shareMatchedBetsData(data: any) {
    this.currentMatchedBets.next(data);
  }

}
