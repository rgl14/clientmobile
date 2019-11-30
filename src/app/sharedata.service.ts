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

  constructor() { 
    this.Funds = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.fundSource = this.Funds.asObservable();

    this.userDescription=<BehaviorSubject<any>>new BehaviorSubject(null); 
    this.userdescriptionSource=this.userDescription.asObservable();

    this.userData=<BehaviorSubject<any>>new BehaviorSubject(null);
    this.userdatasource=this.userData.asObservable();

    this.ClientSignalr=<BehaviorSubject<any>> new BehaviorSubject(null);
    this.HomesignalrDataSource=this.ClientSignalr.asObservable();
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

  
}
