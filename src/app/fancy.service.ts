import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import _ from 'lodash';

// import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class FancyService {

  private fancyConnection;
  private fancyProxy;
  private fancyHubConn;

  private fancyHubAddress;

  fancySource: Observable<any>;
  private currentFancy: BehaviorSubject<any>;

  constructor() {
    this.currentFancy = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.fancySource = this.currentFancy.asObservable();
  }

  connectFancy(fancyHubAddress, fancy) {
    // console.log(this.fancyHubConn);
    this.fancyHubAddress = fancyHubAddress;
    // this.fancyHubAddress="http://167.86.74.159:6111";

    // if(this.fancyHubConn==null){
      this.fancyConnection = (<any>$).hubConnection(this.fancyHubAddress);
      this.fancyProxy = this.fancyConnection.createHubProxy("FancyHub");

      this.fancyConnection.start().done((fancyHubConns) => {
        this.fancyHubConn = fancyHubConns;
        console.log("Fancy Hub Connection Established = " + fancyHubConns.state);
        _.forEach(fancy, (item) => {
          this.fancyProxy.invoke('SubscribeFancy', item);
        });
      }).fail((fancyHubErr) => {
        console.log("Could not connect Fancy Hub = " + fancyHubErr.state)
      })
    // }
    

    this.fancyConnection.stateChanged((change) => {
      if (change.newState != 1 && this.fancyHubConn != null && this.fancyHubAddress!=null) {
        this.fancyConnection.start().done((fancyHubConns) => {
          this.fancyHubConn = fancyHubConns;
          console.log("Fancy Hub Reconnection Established = " + fancyHubConns.state);
          _.forEach(fancy, (item) => {
            this.fancyProxy.invoke('SubscribeFancy', item);
          });
        }).fail((fancyHubErr) => {
          console.log("Could not Reconnect Fancy Hub = " + fancyHubErr.state)
        })
      }
    })


    this.fancyProxy.on("BroadcastSubscribedData", (fancy) => {
      // console.log(fancy);
      this.currentFancy.next(fancy);
    })
  }

  UnsuscribeFancy(fancy) {
    if(!this.fancyHubConn){
      return;
    }
    if (this.fancyHubConn.state == 1) {
      this.fancyHubAddress=null;
      _.forEach(fancy, (item) => {
        this.fancyProxy.invoke('UnsubscribeFancy', item);
      });
      this.fancyConnection.stop();
      this.fancyHubConn=null;
      this.fancyConnection=null;
      this.fancyProxy=null;
      this.currentFancy.next(null);
    }
  }
}
