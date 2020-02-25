import { Injectable } from '@angular/core';
import _ from "lodash";
import { Observable, BehaviorSubject } from 'rxjs';
// import * as $ from 'jquery';

// var $: any;

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  private marketConnection;
  private marketProxy;
  private marketHubConn;

  private marketHubAddress;

  marketSource: Observable<any>;
  private currentMarket: BehaviorSubject<any>;

  constructor() { 
    this.currentMarket=<BehaviorSubject<any>>new BehaviorSubject(null);
    this.marketSource=this.currentMarket.asObservable();
  }

  connectMarket(marketHubAddress, markets) {
    this.marketHubAddress=marketHubAddress;

    this.marketConnection = (<any>$).hubConnection(this.marketHubAddress);
    this.marketProxy = this.marketConnection.createHubProxy("RunnersHub");

    this.marketConnection.start().done((marketHubConns) => {
      this.marketHubConn = marketHubConns;
      console.log("Market Hub Connection Established = " + marketHubConns.state);
      _.forEach(markets, (item) => {
        this.marketProxy.invoke('SubscribeMarket', item.bfId);
      });
    }).fail((marketHubErr) => {
      console.log("Could not connect Market Hub = " + marketHubErr.state)
    })

    this.marketConnection.stateChanged((change) => {
      if (change.newState != 1 && this.marketHubConn != null && this.marketHubAddress!=null) {
        this.marketConnection.start().done((marketHubConns) => {
          this.marketHubConn = marketHubConns;
          console.log("Market Hub Reconnection Established = " + marketHubConns.state);
          _.forEach(markets, (item) => {
            this.marketProxy.invoke('SubscribeMarket', item.bfId);
          });
        }).fail((marketHubErr) => {
          console.log("Could not Reconnect Market Hub = " + marketHubErr.state)
        })
      }
    })


    this.marketProxy.on("BroadcastSubscribedData",(runner)=>{
      // console.log(runner);
      this.currentMarket.next(runner);
    })
  }


  UnsuscribeMarkets(markets) {
    if(!this.marketHubConn){
      return;
    }
    console.log(this.marketHubConn.state,"Unsubscribed market "+markets);
    if (this.marketHubConn.state == 1) {
      this.marketHubAddress=null;
      _.forEach(markets, (item) => {
        this.marketProxy.invoke('UnsubscribeMarket', item.bfId);
      });
      this.marketConnection.stop();
      this.marketHubConn=null;
      this.marketConnection=null;
      this.marketProxy=null;
      this.currentMarket.next(null);
    }
  }

  UnsuscribeSingleMarket(bfId) {
    if(!this.marketHubConn){
      return;
    }
    if (this.marketHubConn.state == 1) {
        this.marketProxy.invoke('UnsubscribeMarket', bfId);
    }
  }
}
