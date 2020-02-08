import { Injectable } from '@angular/core';
// import * as signalR from '@aspnet/signalr';
import { DataFormatService } from './data-format.service';
import { PlaceBetsService } from './place-bets.service';
import { CommonService } from 'src/services/common.service';
import { SharedataService } from './sharedata.service';
// import * as $ from 'jquery';

// import * as signalR from "signalr";

// var $: any;
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private clientConnection;
  private clientProxy;
  private clientHubConn;

  constructor(private commonservice:CommonService, private DFService: DataFormatService, private PBService: PlaceBetsService,private sharedata:SharedataService) { }

  connectClient(clientHubAddress) {

    if (this.commonservice.getToken()) {
      // creates a new hub connection
      this.clientConnection = (<any>$).hubConnection(clientHubAddress);

      // alert(JSON.stringify(this.clientConnection));
      // enabled logging to see in browser dev tools what SignalR is doing behind the scenes
      this.clientConnection.logging = true;
      // create a proxy
      this.clientProxy = this.clientConnection.createHubProxy("DataHub");
      // this.clientProxy.connection.logging = true;
      // alert((this.clientProxy.hubName));

      // start connection
      this.clientConnection.start().done((clientHubConns) => {
        this.clientHubConn = clientHubConns;
        // alert((clientHubConns.token));
        console.log("Client Hub Connection Established = " + clientHubConns.state);
        this.clientProxy.invoke('SubscribeData', this.commonservice.getToken());
      }).fail((clientHubErr) => {
        console.log("Could not connect Client Hub = " + clientHubErr.state)
        // alert((clientHubErr.token));
      })

      this.clientConnection.stateChanged((change) => {
        if (change.state != 1 && this.clientHubConn != null) {
          this.clientConnection.start().done((clientHubConns) => {
            console.log("Client Hub Reconnection Established = " + clientHubConns.state);
            this.clientProxy.invoke('SubscribeData', this.commonservice.getToken());
          }).fail((clientHubErr) => {
            console.log("Could not Reconnect Client Hub = " + clientHubErr.state)
          })
        }
      })


      // publish an event when server pushes a newCounters message for client
      this.clientProxy.on("BroadcastSubscribedData", (data) => {
        console.log(data);
        this.DFService.shareNews(data.news);
        this.DFService.shareDateTime(data.curTime.replace(/ /g, "T"));
        this.DFService.shareNavigationData(this.DFService.NavigationFormat(data.sportsData));
        this.sharedata.shareFancyExposure(data._fancyBook);
        var AllBetsData = {
          _userAvgmatchedBets: data._userAvgmatchedBets,
          _userMatchedBets: data._userMatchedBets,
          _userUnMatchedBets: data._userUnMatchedBets
        };
        this.sharedata.shareAllMatchUnmatchBetsData(AllBetsData);
      })
    }
  }

}
