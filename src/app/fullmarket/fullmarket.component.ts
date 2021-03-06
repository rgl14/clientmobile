import { Component, OnInit, OnDestroy, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { MarketsService } from '../markets.service';
import { FancyService } from '../fancy.service';
import { DataFormatService } from '../data-format.service';
import { Subscription } from 'rxjs';
import _ from "lodash";
import { DeviceDetectorService } from "ngx-device-detector";
import { NotificationService } from '../shared/notification.service';
import { ScoreboardService } from '../scoreboard.service';
import { SharedataService } from '../sharedata.service';
// import * as io from 'socket.io-client';
var BSFDATA:any;
@Component({
  selector: 'app-fullmarket',
  templateUrl: './fullmarket.component.html',
  styleUrls: ['./fullmarket.component.scss']
})
export class FullmarketComponent implements OnInit,OnDestroy {
  sprtId: any;
  tourId: string;
  matchId: string;
  mktId: string;
  mtBfId: string;
  AllMarketData: any;
  subscribedEventdata: any;
  homeBookRates: any;
  homeCommentary: any;
  homeDataMode: any;
  homeDisplayApplication: any;
  homeFancyData: any;
  homeHasFancy: any;
  homeInPlay: any;
  homeMarkets: any;
  MatchName: any;
  homeOddsType: any;
  homeSettings: any;
  homeStatus: any;
  tvConfig: any;
  fancyHubAddress: any;
  markethubAddress: any;
  eventData: Subscription;
  Marketoddssignalr: Subscription;
  fancyoddsignalr: Subscription;
  selectionid: any;
  oldrunnerData: any;
  isoddhigh: string;
  noSpaceMarketid: string;
  curTime: any;
  bookMakingData=[];
  fancyExposure: any;
  highlightOdds: boolean=true;
  stakeTyping: boolean=true;
  oddsTyping: boolean=false;
  mktExpoBook: any;
  newValue: number;
  betStake: any;
  BMExpoBook: any;
  settingsData: any;
  placeMarketData:any={};
  confirmPlaceMarketData: any={};
  scoreData: Subscription;
  placeBookData:any= {};
  fancyInfo: any;
  fancyBookData: any;
  placeFancyData:any= {};
  confirmFancyData: any;
  fullScore: any;
  showScore: boolean=false;
  mktBfId: string;
  showtv: boolean;
  baseUrl: any;
  fancyName:any;
  TvWidth: number;
  bmexposure: any;
  fancypanelsetting: any;
  matchbets=[];
  allmatchbetsource: Subscription;
  betBeforeInplayMins: any;
  startDate: any;
  Currentdatetime: Subscription;
  socket:any;
  // BSFscore: any;

  constructor(
    private route:ActivatedRoute,
    private common :CommonService,
    private sharedata:SharedataService,
    private dataformat:DataFormatService,
    private marketodds:MarketsService,
    private fancymarket :FancyService,
    private renderer:Renderer,
    private deviceInfo:DeviceDetectorService,
    public notification :NotificationService,
    private score:ScoreboardService) {
      // this.socket = io('http://139.180.146.253:3000');
     }

  ngOnInit() {
    this.TvWidth = window.innerWidth;
    this.sprtId=this.route.snapshot.paramMap.get('SportbfId');
    this.tourId=this.route.snapshot.paramMap.get('TourbfId');
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.mktId=this.route.snapshot.paramMap.get('marketId');
    this.mtBfId=this.route.snapshot.paramMap.get('mtBfId');
    this.mktBfId=this.route.snapshot.paramMap.get('bfId');

    
    this.fancyExposure = null;
    this.getallfancyexposure();
    this.allMKTdata();
    this.confirmPlaceMarketData = null;
    if (this.sprtId === '4') {
      let MatchScoreHubAddress = "http://178.238.236.221:13681";
      this.score.MatchScoreSignalr(MatchScoreHubAddress, this.mtBfId);
      // this.socketConnection(this.mtBfId)
      // console.log(this.mtBfId,this.sprtId)
    } else if (this.sprtId === '2') {
      let MatchScoreHubAddress = "http://178.238.236.221:13683";
      this.score.MatchScoreSignalr(MatchScoreHubAddress, this.mtBfId);
    } else if (this.sprtId === '1') {
      let MatchScoreHubAddress = "http://178.238.236.221:13684";
      this.score.MatchScoreSignalr(MatchScoreHubAddress, this.mtBfId);
    }
  }
  identify(index,item){
    return item.mktId;
  }
  betsindex(index,item){
    return index;
  }
  trackByfancyId(index, fancy) {
    return fancy.id;
  }
   
  allMKTdata(){
    var eventdatacount=0;
      this.eventData=this.dataformat.navigationSource.subscribe(data=>{
        if(data!=null){
          // console.log(data)
          eventdatacount++;
          this.AllMarketData=data;
          this.subscribedEventdata=this.AllMarketData[this.sprtId].tournaments[this.tourId].matches[this.matchId];
          // this.bookMakingData=this.subscribedEventdata.bookRates;
          this.homeCommentary=this.subscribedEventdata.commentary;
          this.homeDataMode=this.subscribedEventdata.dataMode;
          this.homeDisplayApplication=this.subscribedEventdata.displayApplication;
          this.homeFancyData=this.subscribedEventdata.fancyData;
          this.homeHasFancy=this.subscribedEventdata.hasFancy;
          this.homeInPlay=this.subscribedEventdata.inPlay;
          this.startDate=this.subscribedEventdata.startDate;
          
          if(this.Marketoddssignalr==undefined){
            this.homeMarkets=this.dataformat.marketsWise(this.subscribedEventdata.markets);
            // console.log(this.homeMarkets);
          }
          this.MatchName=this.subscribedEventdata.name;
          this.homeOddsType=this.subscribedEventdata.oddsType;
          this.homeSettings=this.subscribedEventdata.settings;
          this.betBeforeInplayMins=this.homeSettings.betBeforeInplayMins
          this.homeStatus=this.subscribedEventdata.status;
          this.tvConfig=this.subscribedEventdata.tvConfig;
          this.fancypanelsetting=localStorage.getItem("FancyPanelSetting");
          if(eventdatacount==1){
            this.hubaddress();
          }
        }
      })
      this.allmatchbetsource=this.sharedata.allMatchUnmatchBetsSource.subscribe(resp=>{
        if(resp!=null){
          this.matchbets=resp._userMatchedBets[this.matchId];
          // console.log(this.matchbets);
        }
      })
      this.Currentdatetime=this.dataformat.currentDateTimeSource.subscribe(resp=>{
        if(resp!=null){
          this.curTime=resp;
        }
      })
  }

  hubaddress(){
    this.common.gethubaddress(this.mktId).subscribe(resp=>{
      this.fancyHubAddress=resp.fancyHubAddress;
      this.markethubAddress=resp.hubAddress;
      if(this.markethubAddress != null && this.homeDataMode == 1){
        this.marketodds.connectMarket(this.markethubAddress,this.homeMarkets);
        this.MarketsignalrData();
      }
      if(this.fancyHubAddress!=null){
        this.fancymarket.connectFancy(this.fancyHubAddress,this.matchId);
        this.FancysignalrData();
      }
      this.scorecardresponse(this.matchId)
    })

    this.Allexposurebooks();
    this.common.getsetting().subscribe(resp=>{
      this.settingsData=resp;
    })
  }

  Allexposurebooks(){
    setTimeout(() => {
      _.forEach(this.homeMarkets, (item1, index) => {
        this.common.getexposurebook(item1.id).subscribe(resp=>{
          _.forEach(resp.data, (item, index) => {
            var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_');
                      $('#withoutBetMktExp_' + item1.id + '_' + runnerName).removeClass('win');
                      $('#withoutBetMktExp_' + item1.id + '_' + runnerName).removeClass('lose');
                      if (item.Value >= 0) {
                          $('#withoutBetMktExp_'+ item1.id+'_'+runnerName).text((parseFloat(item.Value).toFixed(2)).toString()).addClass('win');
                      } else if (item.Value <= 0) {
                          $('#withoutBetMktExp_'+ item1.id+'_'+runnerName).text('('+(parseFloat(item.Value).toFixed(2)).toString()+')').addClass('lose');
                      }
                     
          })
          localStorage.setItem('MktExpo_' + item1.mktId, JSON.stringify(resp.data));
        })
      })
      if(this.bookMakingData!=null){
        _.forEach(this.bookMakingData,(item1,index)=>{
          this.common.getBMexposurebook(this.mktId,item1.id).subscribe(data=>{
            if(data!=null){
              // console.log(data.data);
              this.bmexposure=data.data;
              _.forEach(this.bmexposure, (item, index) => {
                var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_');
                          $('#withoutBetBMExp_' + item1.id + '_' + runnerName).removeClass('win');
                          $('#withoutBetBMExp_' + item1.id + '_' + runnerName).removeClass('lose');
                          if (item.Value >= 0) {
                              $('#withoutBetBMExp_'+ item1.id+'_'+runnerName).text((parseFloat(item.Value).toFixed(2)).toString()).addClass('win');
                          } else if (item.Value <= 0) {
                              $('#withoutBetBMExp_'+ item1.id+'_'+runnerName).text('('+(parseFloat(item.Value).toFixed(2)).toString()+')').addClass('lose');
                          }
              })
              localStorage.setItem("BMExpo_" + item1.id,JSON.stringify(data.data))
            }
          })
        })
      }
    }, 2000)
  }

  openTv() {
    if (this.showtv == false) {
      this.showtv = true;
      if (this.tvConfig != null && this.tvConfig.channelIp != null) {
        $("#streamingBox").fadeIn();
        this.baseUrl =
          "https://shivexch.com/tv_api/live_tv/index.html?token=3af0f960-daba-47ea-acc2-a04b7ecf44bf&mtid="+this.mtBfId;
      } else {
        $("#streamingBox").fadeIn();
        this.baseUrl =
          "https://shivexch.com/tv_api/animation/index.html?token=3af0f960-daba-47ea-acc2-a04b7ecf44bf&mtid="+this.mtBfId;
      }

      let blogUrl: any = `${this.baseUrl}&mtid=${this.mtBfId}`;
      $("#iframeTv").attr("src", blogUrl);
    } else {
      this.showtv = false;
      this.closeTv();
    }
  }
  closeTv() {
    $("#streamingBox").fadeOut();
  }

  MarketsignalrData(){
    this.Marketoddssignalr=this.marketodds.marketSource.subscribe(runner=>{
      if (runner != null) {
        // console.log(runner);
        // this.eventData.unsubscribe();
      this.matchDateTime();
      // this.setDatabsfScore();
        let marketIndex = _.findIndex(this.homeMarkets, function(o) {
          return o.bfId == runner.marketid;
        });
        this.isoddhigh = localStorage.getItem("isOddHigh");
        if (marketIndex > -1) {
          this.selectionid = runner.marketid.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
          let MktRunnerData = this.homeMarkets[marketIndex].runnerData;
          this.noSpaceMarketid = runner.marketid.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
          var txt = runner.runner.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
          _.forEach(MktRunnerData, (item, index) => {
            if (item.runnerName == runner.runner) {
              this.oldrunnerData = MktRunnerData[index];
              this.homeMarkets[marketIndex].runnerData[index] = runner;
              this.homeMarkets[marketIndex].runnerData[index]["runnerName"] =runner.runner;
              this.homeMarkets[marketIndex].runnerData[index]["status"] =runner.runnerStatus;
              this.isoddhigh=localStorage.getItem("Highlightodds");
              if(this.isoddhigh==="1"){
                this.highlightOdds=true;
              }else{
                this.highlightOdds=false;
              }
              // if (this.isoddhigh == "true") {
                if ((item.back1 != runner.back1 ||item.backSize1 != runner.backSize1) && this.highlightOdds) {
                  $( "#selection_" + this.mktId + "_" + txt + " .back-1").addClass("spark");
                  const back1 = $("#selection_" + this.mktId + "_" + txt + " .back-1");
                  this.removeChangeClass(back1);
                }
                if ((item.back2 != runner.back2 ||item.backSize2 != runner.backSize2) && this.highlightOdds) {
                  $("#selection_" + this.mktId + "_" + txt + " .back-2").addClass("spark");
                  const back2 = $("#selection_" + this.mktId + "_" + txt + " .back-2");
                  this.removeChangeClass(back2);
                }
                if ((item.back3 != runner.back3 ||item.backSize3 != runner.backSize3) && this.highlightOdds) {
                  $("#selection_" + this.mktId + "_" + txt + " .back-3").addClass("spark");
                  const back3 = $("#selection_" + this.mktId + "_" + txt + " .back-3");
                  this.removeChangeClass(back3);
                }
  
                if ((item.lay1 != runner.lay1 ||item.laySize1 != runner.laySize1) && this.highlightOdds) {
                  $("#selection_" + this.mktId + "_" + txt + " .lay-1").addClass("spark");
                  const lay1 = $("#selection_" + this.mktId + "_" + txt + " .lay-1");
                  this.removeChangeClass(lay1);
                }
                if (
                  (item.lay2 != runner.lay2 ||item.laySize2 != runner.laySize2) && this.highlightOdds) {
                  $("#selection_" + this.mktId + "_" + txt + " .lay-2").addClass("spark");
                  const lay2 = $("#selection_" + this.mktId + "_" + txt + " .lay-2");
                  this.removeChangeClass(lay2);
                }
                if ((item.lay3 != runner.lay3 || item.laySize3 != runner.laySize3) && this.highlightOdds) {
                  $("#selection_" + this.mktId + "_" + txt + " .lay-3").addClass("spark");
                  const lay3 = $("#selection_" + this.mktId + "_" + txt + " .lay-3");
                  this.removeChangeClass(lay3);
                }
              // }
            }
          });
        }
      }
    })
  }
  removeChangeClass(changeClass) {
    setTimeout(() => {
      changeClass.removeClass("spark");
    }, 300);
  }
  getPnlValue(runner, Pnl) {
    // console.log(runner,Pnl)
    let pnl = "";
    if (Pnl) {
      _.forEach(Pnl, (value, index) => {
        if (runner.name == value.Key) {
          pnl = value.Value;
        }
      });
    }
    return pnl;
  }

  matchDateTime(){
    let curdate=new Date(this.curTime);
    var modifiedDateValue = this.startDate.split(" "); // Gives Output as 2016,01,06 00:43:06
    var matchdatesplitted=modifiedDateValue[0].split("-")
    var matchdate = new Date(matchdatesplitted[2] + "/" + matchdatesplitted[1] + "/" + matchdatesplitted[0]+" "+modifiedDateValue[1]); // Here, passing the format as "yyyy/mm/dd" 
    let milliseconds=<any>matchdate.getTime()-<any>curdate.getTime();
    // let seconds = (milliseconds / 1000) ;
    let minutes = <Number>((milliseconds / (1000*60)) % 60);
    let hours   = <Number>((milliseconds / (1000*60*60)) % 24);
    let days = <Number>((milliseconds / (1000*60*60*24)) %7);
    // console.log("Curr ",curdate);
    // console.log("Matchdate " +matchdate);
    // console.log("Hrs " +hours);
    // console.log("Min " +minutes);
    // console.log("Day " +days);
    if(days==0 && hours==0 && minutes<=this.betBeforeInplayMins){
      // return true;
      // console.log("Inplay")
    }else{
      // return false;
      // console.log("Upcoming")
    }
  }
//   socketConnection(mtbfid){
//     this.socket.emit('market_login_main',mtbfid);
//     this.socket.on('sendSkyScoreData',function(data){
//         // console.log(data)
//         if (parseInt(mtbfid)==data.matchBfId) {
//           BSFDATA=data;
//         }
//         else{
//             this.disconnect();
//         }
//     });
// }

// setDatabsfScore(){
//   this.BSFscore=BSFDATA;
//   // console.log(this.BSFscore);
// }

  getPnlClass(runner, Pnl) {
    let pnlClass = "";
    if (Pnl) {
      _.forEach(Pnl, (value, index) => {
        if (runner.name == value.Key) {
          if (value.Value >= 0) {
            pnlClass = "win";
          }
          if (value.Value < 0) {
            pnlClass = "lose";
          }
        }
      });
    }
    return pnlClass;
  }

  FancysignalrData(){
    this.fancyoddsignalr=this.fancymarket.fancySource.subscribe(fancy=>{
        if (fancy != null) {
          // console.log(fancy);
          // this.eventData.unsubscribe();
          // this.bookMakingData = fancy.bookRates;
          // this.bookrunnerData = this.bookMakingData.runnerData;
          this.homeFancyData = fancy.data;
          if(this.bookMakingData.length!=0){
            _.forEach(this.bookMakingData,(item,index)=>{
              item["oldPnl"]=this.bmexposure
            })
          }
          // console.log(this.bookMakingData);
          _.forEach(this.homeFancyData, (item, index) => {
            // this.bookrunnerData = item.runnerData;
            if (this.fancyExposure != null && this.fancyExposure != undefined) {
              let fancyExpo = this.fancyExposure[item.name];
              // console.log(fancyExpo);
              if (fancyExpo != undefined) {
                item["oldPnl"] = fancyExpo;
              }
            }
          });
  
          if (this.fancyExposure != null && this.fancyExposure != undefined) {
            _.forEach(this.fancyExposure, (item, index) => {
              _.forEach(this.homeFancyData, fancy => {
                if (index == fancy.name) {
                  var fancyName = index.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
                  if (item == 0) {
                    item = 0;
                    $("#fancyBetBookBtn_" + fancy.id + "").css("display","block");
                  } else {
                    if (item >= 0) {
                      $("#fexp_" + fancy.id + fancyName).text("" + item.toFixed(2) + "").css("color", "green");
                      $("#fancyBetBookBtn_" + fancy.id).css("display", "block");
                    } else {
                      $("#fexp_" + fancy.id + fancyName).text("" + item.toFixed(2) + "").css("color", "red");
                      $("#fancyBetBookBtn_" + fancy.id).css("display", "block");
                    }
                  }
                }
              });
            });
          }
  
          _.forEach(this.homeFancyData, (item, index) => {
            if (item.ballStatus != "") {
              // this.removeRunningfancybetslip(item.id);
            }
          });
        }
    })
  }

  scorecardresponse(matchid){
    this.scoreData=this.score.scoreSource.subscribe(data=>{
      // console.log(data);
      if (data != null) {
        this.fullScore = data[0];
        // console.log(this.fullScore);
        if (this.fullScore != undefined) {
          this.showScore = true;
        } else {
          this.showScore = false;
        }
      }
    })
  }

 

  getbmexposure(bookid,name){
    this.common.getBMexposurebook(this.mktId,bookid).subscribe(data=>{
      if(data!=null){
        console.log(data);
        this.bmexposure=data.data;
        _.forEach(this.bmexposure, (item, index) => {
          var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_');
                    $('#withoutBetBMExp_' + bookid + '_' + runnerName).removeClass('win');
                    $('#withoutBetBMExp_' + bookid + '_' + runnerName).removeClass('lose');
                    if (item.Value >= 0) {
                        $('#withoutBetBMExp_'+ bookid+'_'+runnerName).text((parseFloat(item.Value).toFixed(2)).toString()).addClass('win');
                    } else if (item.Value <= 0) {
                        $('#withoutBetBMExp_'+ bookid+'_'+runnerName).text('('+(parseFloat(item.Value).toFixed(2)).toString()+')').addClass('lose');
                    }
        })
        localStorage.setItem("BMExpo_" + bookid,JSON.stringify(data.data))
      }
    })
  }
  getFancyExposure(fancyid) {
    this.common.getfancyexposurebook(this.matchId,fancyid).subscribe(data => {
      if (data != null) {
        this.fancyExposure = data;
      }
    })
  }
  getallfancyexposure(){
    this.sharedata.fancyExposureSource.subscribe(data=>{
      if (data != null) {
        this.fancyExposure = data;
      }
    })
  }
  
  getFancyBook(matchid,fancyid,fname) {
    this.common.getfancybook(matchid, fancyid).subscribe(data => {
        $("#fancyBetBookLeftSide #sideWrap").addClass("fade-in");
        this.fancyBookData = data.data;
        this.fancyName=fname;
      });
  }
  ngOnDestroy() {
    if(this.Currentdatetime){
      this.Currentdatetime.unsubscribe();
    }
    if(this.eventData){
      this.eventData.unsubscribe();
    }
    if(this.allmatchbetsource){
      this.allmatchbetsource.unsubscribe();
    }
    if(this.fancyoddsignalr){
      this.fancyoddsignalr.unsubscribe();
    }
    if(this.Marketoddssignalr){
      this.Marketoddssignalr.unsubscribe();
    }
    if(this.scoreData){
      this.scoreData.unsubscribe();
    }
    // this.socket.disconnect();
    this.marketodds.UnsuscribeMarkets(this.homeMarkets);
    this.fancymarket.UnsuscribeFancy(this.matchId);
    this.score.unSubscribeMatchScore(this.mtBfId);
  }
 

  openMarketBetslip(event,backLay,odds,runnerName,sportId,mtbfId,matchId,marketId,bfId) {
    // this.oneClicked = localStorage.getItem("oneClickBet");
    this.cancelBetslip();
    $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");
    this.renderer.setElementClass(event.target, "select", true);
    // if (this.oneClicked == "true") {
    //   let selected_Stake_btn = localStorage.getItem("selectedStakeBtn");
    //   var oneClickMOData = {
    //     backlay: backLay,
    //     sportId: sportId,
    //     matchBfId: mtBfId,
    //     bfId: bfId,
    //     marketId: marketId,
    //     matchId: matchId,
    //     runnerName: runnerName,
    //     matchName: this.matchName,
    //     odds: odds,
    //     stake: this.oneClickStake[selected_Stake_btn]
    //   };
    //   oneClickMOData["profit"] = this.calcAllProfit(oneClickMOData);
    //   this.confirmBetPop(oneClickMOData);
    //   // this.oneClickPlaceMOBet(oneClickMODafta);
    //   return false;
    // } else {
      // console.log(event,backLay,odds,runnerName,sportId,mtbfId,matchId,marketId,bfId,"Placedatabetslip")
      this.placeMarketData = {
        backlay: backLay,
        marketId: marketId,
        matchId: matchId,
        odds: odds,
        runnerName: runnerName,
        // stake: this.settingsData.defaultStake,
        stake: '',
        profit: 0,
        bfId: bfId,
        matchBfId: mtbfId,
        sportId: sportId
      };

      this.placeMarketData["source"] = "Mobile";
      this.placeMarketData["info"] ="device:" +this.deviceInfo.device +", os:" +this.deviceInfo.os +", os_version:" +this.deviceInfo.os_version +", browser:" +this.deviceInfo.browser +", browser_version:" +this.deviceInfo.browser_version;
      this.placeMarketData.profit = this.calcAllProfit(this.placeMarketData);
      // console.log(this.placeMarketData,"Placebetdata")
      this.calcExposure(this.placeMarketData, null);
    // }
  }

  openBookBetSlip(event,backLay,odds,runnerName,runnerId,bookId,bookName,bookType,matchId,marketId) {
    this.cancelBetslip();
    $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");
    this.renderer.setElementClass(event.target, "select", true);
    this.placeBookData = {
      backlay: backLay,
      bookId: bookId,
      // bookType: bookType,
      eventId: matchId,
      marketId:this.mktId,
      odds: odds,
      runnerId: runnerId,
      runnerName: runnerName,
      profit:0,
      // stake: this.settingsData.defaultStake,
      stake: '',
      mktname: bookName
    };
    this.placeBookData["source"] = "Mobile";
    this.placeBookData["info"] ="device:" +this.deviceInfo.device +", os:" +this.deviceInfo.os +", os_version:" +this.deviceInfo.os_version +", browser:" +this.deviceInfo.browser +", browser_version:" +this.deviceInfo.browser_version;
    this.placeBookData.profit = this.calcAllProfit(this.placeBookData);

    this.calcExposure(this.placeBookData, null);
  }

  openFancyBetSlip(event,yesNo,score,rate,fancyName,fancyId,matchId,bfId) {
    // console.log(yesNo, score, rate, fancyName, fancyId, matchId);
    this.cancelBetslip();
    $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");
    this.renderer.setElementClass(event.target, "select", true);

    this.placeFancyData = {
      fancyId: fancyId,
      matchId: matchId,
      mktBfId: this.mktBfId,
      marketId:this.mktId,
      matchBfId: bfId,
      rate: rate,
      runnerName: fancyName,
      score: score,
      // stake: this.settingsData.defaultStake,
      stake: '',
      yesno: yesNo
    };
    this.placeFancyData["source"] = "Mobile";
    this.placeFancyData["info"] ="device:" +this.deviceInfo.device +", os:" +this.deviceInfo.os +", os_version:" +this.deviceInfo.os_version +", browser:" +this.deviceInfo.browser +", browser_version:" +this.deviceInfo.browser_version;
    this.placeFancyData.profit = this.calcAllProfit(this.placeFancyData);
  }

  confirmBetPop(placeMarketData) {
    this.cancelBetslip();
    this.confirmPlaceMarketData = placeMarketData;
  }

  confirmFancyPop(placeFancyData) {
    this.cancelBetslip();
    this.confirmFancyData = placeFancyData;
  }

  openCloseFancyInfo(fancy) {
    this.fancyInfo = fancy;
  }

  closeOverlayInfo() {
    this.fancyBookData = null;
  }


  cancelBetPop() {
    this.confirmPlaceMarketData = null;
    this.confirmFancyData = null;
  }

  //place bet for match Odds
  placeMOBet(MOData) {
    $("#loading").css("display", "flex");
    // console.log(MOData);
    this.confirmPlaceMarketData = null;
    this.common.PlaceMOBet(MOData).subscribe(data => {
      if (data.status == "Success") {
        $("#loading").css("display", "none");
        this.notification.success(data.result);
        this.getexposureafterplacebet(MOData.marketId);
        this.cancelBetslip();
        this.placeMarketData = {};
      } else {
        $("#loading").css("display", "none");
        this.cancelBetslip();
        this.notification.error(data.result);
      }
    });
  }

  //place bet for bookmaker
  placeBMBet(BookData) {
    $("#loading").css("display", "flex");
    this.common.PlaceBMBet(BookData).subscribe(data => {
      if (data.status == "Success") {
        this.notification.success(data.result);
        this.getbmexposure(BookData.bookId,BookData.runnerName);
        this.cancelBetslip();
        $("#loading").css("display", "none");
      } else {
        this.cancelBetslip();
        this.notification.error(data.result);
        $("#loading").css("display", "none");
      }
    });
  }

  //place bet for fancy
  placeFancyBet(fancyData) {
    $("#loading").css("display", "flex");
    this.confirmFancyData = null;
    this.common.PlaceFancyBet(fancyData).subscribe(data => {
      if (data.status == "Success") {
        this.cancelBetslip();
        this.getFancyExposure(fancyData.fancyId);
        this.notification.success(data.result);
        $("#loading").css("display", "none");
      } else {
        $("#loading").css("display", "none");
        this.notification.error(data.result);
      }
    });
  }

  getexposureafterplacebet(mktid){
    this.common.getexposurebook(mktid).subscribe(resp=>{
      _.forEach(resp.data, (item, index) => {
        var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_');
	                $('#withoutBetMktExp_' + mktid + '_' + runnerName).removeClass('win');
	                $('#withoutBetMktExp_' + mktid + '_' + runnerName).removeClass('lose');
	                if (item.Value >= 0) {
	                    $('#withoutBetMktExp_'+ mktid+'_'+runnerName).text((parseFloat(item.Value).toFixed(2)).toString()).addClass('win');
	                } else if (item.Value <= 0) {
	                    $('#withoutBetMktExp_'+ mktid+'_'+runnerName).text('('+(parseFloat(item.Value).toFixed(2)).toString()+')').addClass('lose');
                  }
      })
    })
  }

  //betslip

  buttonInput(input, placeData) {
    if (this.stakeTyping) {
      if (input == ".") {
        return false;
      }
      if (parseInt(placeData.stake) >= 100000000) {
        placeData.stake = 100000000;
      } else {
        placeData.stake = placeData.stake + input;
      }
    } else if (this.oddsTyping) {
      var odds = parseFloat(placeData.odds);
      if (odds >= 1000) {
        placeData.odds = 1000;
      } else {
        if (placeData.odds.toString().indexOf(".") != -1 && input == ".") {
          return false;
        } else if (placeData.odds.toString().indexOf(".") != -1) {
          var number = placeData.odds.toString().split(".");
          if (number[1].length > 1) {
            return false;
          }
        }
        placeData.odds = placeData.odds + input;
        console.log(placeData.odds);
      }
    }
    placeData.profit = this.calcAllProfit(placeData);
    this.calcExposure(placeData, null);
  }

  oddsDown(placeMarketData) {
    if (placeMarketData.odds == "") {
      return false;
    }
    var odds = parseFloat(placeMarketData.odds);
    if (odds <= 1.01) {
      placeMarketData.odds = 1.01;
    } else {
      placeMarketData.odds = this.oddsInput(
        odds - this.oddsDiffCalculate(odds)
      );
    }

    placeMarketData.profit = this.calcAllProfit(placeMarketData);
    this.calcExposure(placeMarketData, null);
  }

  oddsUp(placeMarketData) {
    if (placeMarketData.odds == "") {
      placeMarketData.odds = 1.01;
    }
    var odds = parseFloat(placeMarketData.odds);
    if (odds >= 1000) {
      placeMarketData.odds = 1000;
    } else {
      placeMarketData.odds = this.oddsInput(
        odds + this.oddsDiffCalculate(odds)
      );
    }

    placeMarketData.profit = this.calcAllProfit(placeMarketData);
    this.calcExposure(placeMarketData, null);
  }

  oddsInput(value) {
    return parseFloat(value) > 19.5
      ? parseFloat(value).toFixed(0)
      : parseFloat(value) > 9.5
      ? parseFloat(value).toFixed(1)
      : parseFloat(value).toFixed(2);
  }

  oddsDiffCalculate(currentOdds) {
    var diff;
    if (currentOdds < 2) {
      diff = 0.01;
    } else if (currentOdds < 3) {
      diff = 0.02;
    } else if (currentOdds < 4) {
      diff = 0.05;
    } else if (currentOdds < 6) {
      diff = 0.1;
    } else if (currentOdds < 10) {
      diff = 0.2;
    } else if (currentOdds < 20) {
      diff = 0.5;
    } else if (currentOdds < 30) {
      diff = 1.0;
    } else {
      diff = 2.0;
    }
    return diff;
  }

  buttonDelete(placeData) {
    if (this.stakeTyping) {
      if (placeData.stake != "") {
        placeData.stake = placeData.stake.toString().slice(0, -1);
      }
    } else if (this.oddsTyping) {
      placeData.odds = placeData.odds.toString().slice(0, -1);
    }

    placeData.profit = this.calcAllProfit(placeData);
    this.calcExposure(placeData, null);
  }

  stakeUp(placeData) {
    if (placeData.stake == "") {
      placeData.stake = 1;
    }
    var stake = parseInt(placeData.stake);
    if (stake >= 100000000) {
      placeData.stake = 100000000;
    } else {
      placeData.stake = stake + this.stakeDiffCal(stake);
    }

    placeData.profit = this.calcAllProfit(placeData);
    this.calcExposure(placeData, null);
  }

  stakeDown(placeData) {
    if (placeData.stake == "") {
      return false;
    }
    var stake = parseInt(placeData.stake);
    if (stake < 1) {
      placeData.stake = "";
    } else {
      placeData.stake = stake - this.stakeDiffCal(stake);
    }
    placeData.profit = this.calcAllProfit(placeData);
    this.calcExposure(placeData, null);
  }

  stakeDiffCal(currentStake) {
    var diff;
    if (currentStake < 25) {
      diff = 1;
    } else if (currentStake < 100) {
      diff = 10;
    } else if (currentStake < 200) {
      diff = 20;
    } else if (currentStake < 500) {
      diff = 50;
    } else if (currentStake < 1000) {
      diff = 100;
    } else if (currentStake < 2000) {
      diff = 250;
    } else if (currentStake < 5000) {
      diff = 500;
    } else if (currentStake < 10000) {
      diff = 1000;
    } else {
      diff = 1500;
    }
    return diff;
  }

  stakeChange(buttonStake, placeData) {
    if (placeData.stake == "") {
      placeData.stake = 0;
    }
    var stake = parseInt(placeData.stake);
    if (stake >= 100000000) {
      placeData.stake = 100000000;
    } else {
      placeData.stake = stake + buttonStake;
    }

    placeData.profit = this.calcAllProfit(placeData);
    this.calcExposure(placeData, null);
  }
  typingSign(type, placeData) {
    if(type=='stake'){
      placeData.stake="";
    }
    if(type=='odds'){
      placeData.odds="";
    }
    placeData.profit = this.calcAllProfit(placeData);
    this.calcExposure(placeData, null);
  }

  cancelBetslip() {
    $(".back-1,.back-2,.back-3,.lay-1,.lay-2,.lay-3").removeClass("select");
    if (this.placeMarketData != null) {
      this.calcExposure(this.placeMarketData, "remove");
    }
    if (this.placeFancyData != null) {
      this.calcExposure(this.placeFancyData, "remove");
    }
    if (this.placeBookData != null) {
      this.calcExposure(this.placeBookData, "remove");
    }

    this.placeMarketData = {};
    this.placeFancyData = {};
    this.placeBookData = {};
    // this.selectedBet=null;
  }

  calcAllProfit(placeData) {
    var pnl;
    if ((placeData.backlay == "Back" || placeData.backlay == "Lay") && placeData.bookId == undefined) {
      if (placeData.stake != "" && placeData.odds != "") {
        return (pnl = ((parseFloat(placeData.odds) - 1) * parseFloat(placeData.stake)).toFixed(2));
      } else {
        return (pnl = 0);
      }
    }
    if (
      (placeData.backlay == "Back" || placeData.backlay == "Lay") && placeData.bookId != undefined) {
      if (placeData.bookType == 1) {
        if (placeData.stake != "" && placeData.odds != "") {
          return (pnl = ((parseFloat(placeData.odds) * parseFloat(placeData.stake)) /100).toFixed(2));
        } else {
          return (pnl = 0);
        }
      } else {
        if (placeData.stake != "" && placeData.odds != "") {
          return (pnl = ((parseFloat(placeData.odds) - 1) *parseFloat(placeData.stake)).toFixed(2));
        } else {
          return (pnl = 0);
        }
      }
    } else if (placeData.yesno == "Yes" || placeData.yesno == "No") {
      if (placeData.stake != "" &&placeData.rate != "" &&placeData.yesno == "Yes") {
        return (pnl = ((parseFloat(placeData.rate) * parseFloat(placeData.stake)) /100).toFixed(2));
      } else if (placeData.stake != "" &&placeData.rate != "" &&placeData.yesno == "No") {
        return (pnl = ((parseFloat(placeData.rate) * parseFloat(placeData.stake)) / 100).toFixed(2));
      } else {
        return (pnl = 0);
      }
    }
  }

  calcExposure(placeData, remove) {
    
    if ((placeData.backlay == "Back" || placeData.backlay == "Lay") &&placeData.bookId == undefined) {
      this.mktExpoBook = JSON.parse(localStorage.getItem("MktExpo_" + placeData.marketId));
      if (this.mktExpoBook == null) {
        return false;
      }
      if (remove == "remove") {
        this.mktExpoBook.forEach((item, index) => {
          var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g,"_");
          // if (item.Value > 0) {
          $("#withBetMktExp_" + placeData.marketId + "_" + runnerName).text("").removeClass("to-win");
          // } else {
          $("#withBetMktExp_" + placeData.marketId + "_" + runnerName).text("").removeClass("to-lose");
          // }
        });
      } else {
        // console.log(this.mktExpoBook)
        _.forEach(this.mktExpoBook, (item, index) => {
          this.newValue = 0;
          if (placeData.backlay == "Back") {
            if (item.Key == placeData.runnerName) {
              this.newValue =parseFloat(item.Value) + parseFloat(placeData.profit);
              item.Value = this.newValue.toFixed(2);
            } else {
              if (placeData.stake == "") {
                this.betStake = 0;
              } else {
                this.betStake = placeData.stake;
              }
              this.newValue =parseFloat(item.Value) - parseFloat(this.betStake);
              item.Value = this.newValue.toFixed(2);
            }
          } else {
            if (item.Key == placeData.runnerName) {
              this.newValue =parseFloat(item.Value) - parseFloat(placeData.profit);
              item.Value = this.newValue.toFixed(2);
            } else {
              if (placeData.stake == "") {
                this.betStake = 0;
              } else {
                this.betStake = placeData.stake;
              }
              this.newValue =parseFloat(item.Value) + parseFloat(this.betStake);
              item.Value = this.newValue.toFixed(2);
            }
          }
        });
        _.forEach(this.mktExpoBook, (item, index) => {
          var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace( /[_\s]/g, "_");
          $("#withBetMktExp_" + placeData.marketId + "_" + runnerName).removeClass("to-win");
          $("#withBetMktExp_" + placeData.marketId + "_" + runnerName).removeClass("to-lose");

          if (item.Value > 0) {
            $("#withBetMktExp_" + placeData.marketId + "_" + runnerName).text(item.Value).addClass("to-win");
          } else {
            $("#withBetMktExp_" + placeData.marketId + "_" + runnerName).text("(" + item.Value + ")").addClass("to-lose");
          }
        });
      }
    }
    if ((placeData.backlay == "Back" || placeData.backlay == "Lay") && placeData.bookId != undefined) {
      this.BMExpoBook = JSON.parse(localStorage.getItem("BMExpo_" + placeData.bookId));
      if (this.BMExpoBook == null) {
        return false;
      }

      if (remove == "remove") {
        _.forEach(this.BMExpoBook, (item, index) => {
          var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g,"_");

          // $('#withBetBMExp_' + placeData.bookId + '_' + runnerName).removeClass('to-win');
          // $('#withBetBMExp_' + placeData.bookId + '_' + runnerName).removeClass('to-lose');
          // if (item.Value >= 0) {
            $("#withBetBMExp_" + placeData.bookId + "_" + runnerName).text("").addClass("to-win");
          // } else {
            $("#withBetBMExp_" + placeData.bookId + "_" + runnerName).text("").addClass("to-lose");
          // }
        });
      } else {
        _.forEach(this.BMExpoBook, (item, index) => {
          this.newValue = 0;

          if (placeData.backlay == "Back") {
            if (item.Key == placeData.runnerName) {
              this.newValue =
                parseFloat(item.Value) + parseFloat(placeData.profit);
              item.Value = this.newValue.toFixed(2);
            } else {
              if (placeData.stake == "") {
                this.betStake = 0;
              } else {
                this.betStake = placeData.stake;
              }
              this.newValue = parseFloat(item.Value) - parseFloat(this.betStake);
              item.Value = this.newValue.toFixed(2);
            }
          } else {
            if (item.Key == placeData.runnerName) {
              this.newValue = parseFloat(item.Value) - parseFloat(placeData.profit);
              item.Value = this.newValue.toFixed(2);
            } else {
              if (placeData.stake == "") {
                this.betStake = 0;
              } else {
                this.betStake = placeData.stake;
              }
              this.newValue =parseFloat(item.Value) + parseFloat(this.betStake);
              item.Value = this.newValue.toFixed(2);
            }
          }
        });

        _.forEach(this.BMExpoBook, (item, index) => {
          var runnerName = item.Key.replace(/[^a-z0-9\s]/gi, "").replace( /[_\s]/g,"_");
          $('#withBetBMExp_' + placeData.bookId + '_' + runnerName).removeClass('to-win');
          $('#withBetBMExp_' + placeData.bookId + '_' + runnerName).removeClass('to-lose');
          if (item.Value >= 0) {
            $("#withBetBMExp_" + placeData.bookId + "_" + runnerName).text(item.Value).addClass("to-win");
          } else {
            $("#withBetBMExp_" + placeData.bookId + "_" + runnerName).text("(" + item.Value + ")").addClass("to-lose");
          }
        });
      }
    }
  }
}
