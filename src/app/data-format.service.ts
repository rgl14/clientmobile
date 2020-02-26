import { Injectable } from '@angular/core';
import _ from "lodash";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataFormatService {
  navigationSource: Observable<any>;
  private currentNavigation: BehaviorSubject<any>;

  menusSource: Observable<any>;
  private currentMenus: BehaviorSubject<any>;

  currentDateTimeSource: Observable<any>;
  private currentDateTime: BehaviorSubject<any>;

  fundsSource: Observable<any>;
  private currentFunds: BehaviorSubject<any>;

  betStakeSource: Observable<any>;
  private currentBetStake: BehaviorSubject<any>;

  newsSource: Observable<any>;
  private currentNews: BehaviorSubject<any>;

  userDescriptionSource: Observable<any>;
  private currentUserDescription: BehaviorSubject<any>;

  constructor() {
    this.currentNavigation = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.navigationSource = this.currentNavigation.asObservable();

    this.currentMenus = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.menusSource = this.currentMenus.asObservable();

    this.currentDateTime = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.currentDateTimeSource = this.currentDateTime.asObservable();

    this.currentFunds = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.fundsSource = this.currentFunds.asObservable();

    this.currentBetStake = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.betStakeSource = this.currentBetStake.asObservable();

    this.currentNews = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.newsSource = this.currentNews.asObservable();

    this.currentUserDescription = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.userDescriptionSource = this.currentUserDescription.asObservable();
  }

  shareNavigationData(data: any) {
    // this.currentNavigation.next()
    this.currentNavigation.next(data);
  }

  shareMenusData(data: any) {
    this.currentMenus.next(data);
  }

  shareDateTime(date: Date) {
    this.currentDateTime.next(date);
  }

  shareFunds(data: any) {
    this.currentFunds.next(data);
  }

  shareNews(data: any) {
    this.currentNews.next(data);
  }

  shareBetStake(data: any) {
    this.currentBetStake.next(data);
  }

  shareUserDescription(data: any) {
    this.currentUserDescription.next(data);
  }

  homeSignalrFormat = function(sportsData) {
    var sportDataFormat = {}
    _.forEach(sportsData, function(item, index) {
        var tourDataFormat = {}
        _.forEach(item.tournaments, function(item2, index2) {
            var matchesDataFormat = {}
            _.forEach(item2.matches, function(item3, index3) {
                var marketsDataFormat = {}
                _.forEach(item3.markets, function(item4, index4) {
                    marketsDataFormat[item4.id] = item4;
                })
                matchesDataFormat[item3.id] = item3;
            })
            tourDataFormat[item2.bfId] = {
                'bfId': item2.bfId,
                'id': item2.id,
                'name': item2.name,
                'matches': matchesDataFormat
            }
        })
        sportDataFormat[item.bfId] = {
            'bfId': item.bfId,
            'id': item.id,
            'name': item.name,
            'tournaments': tourDataFormat
        }
    })
    return sportDataFormat;
}

inplaylistwise = function(sportdata, inplaytype) {
  var inplaydata = [];
  // $scope.multimarket = JSON.parse(localStorage.getItem("Multimarkets"));
  _.forEach(sportdata, function(item, index) {
      // var data = {}
      // var highlightdata = []
      _.forEach(item.tournaments, function(item1, index1) {
          _.forEach(item1.matches, function(item2, index2) {
            if(item2.bookRates==null){
              item2.bookRates=[];
            }
            // console.log(item2.bookRates.length);
              _.forEach(item2.markets, function(item3, index3) {
                if (item3.name == "Match Odds") {
                    item3.runnerData['bfId'] = item3.bfId;
                    item3.runnerData['inPlay'] = item2.inPlay;
                    item3.runnerData['isBettingAllow'] = item3.isBettingAllow;
                    item3.runnerData['isMulti'] = item3.isMulti;
                    item3.runnerData['marketId'] = item3.id;
                    item3.runnerData['matchDate'] = item2.startDate;
                    item3.runnerData['matchId'] = item2.id;
                    item3.runnerData['matchName'] = item2.name;
                    item3.runnerData['sportName'] = item.name;
                    item3.runnerData['status'] = item2.status;
                    item3.runnerData['mtBfId'] = item2.bfId;
                    item3.runnerData['TourbfId'] = item1.bfId;
                    item3.runnerData['Tourname'] = item1.name;
                    item3.runnerData['SportbfId'] = item.bfId;
                    item3.runnerData['hasFancy'] = item2.hasFancy;
                    item3.runnerData['hasbookmaker'] = item2.bookRates? (item2.bookRates.length >= 1? 1: 0): 0;
                    // _.forEach($scope.multimarket, function(item4) {
                    //     if (item3.id == item4) {
                    //         item3.runnerData['isMulti'] = 1;
                    //     }
                    // })
                    if (item2.inPlay == 1 && inplaytype == 0) {
                      inplaydata.push(item3.runnerData);
                    }
                    if (item2.inPlay == 0 && inplaytype == 1) {
                      inplaydata.push(item3.runnerData);
                    }  
                    // else if (item2.inPlay != 1 && inplaytype == 1 && $rootScope.getDateTime(item2.startDate, $rootScope.curTime, 1) == 0 && inplaytype == 1) {
                    //     highlightdata.push(item3.runnerData);
                    // } else if (item2.inPlay != 1 && inplaytype == 2 && $rootScope.getDateTime(item2.startDate, $rootScope.curTime, 1) == 1 && inplaytype == 2) {
                    //     highlightdata.push(item3.runnerData);
                    // }
                }
            })
          })
      })
      // data["name"] = item.name;
      // data["inplayData"] = highlightdata;
      // data["id"] = 0;
      // inplaydata.push(data);
      // console.log(inplaydata);
  })
  return inplaydata
}

  NavigationFormat(sportsData) {
    var sportDataFormat = {};
    sportsData.forEach(function (item, index) {
      var tourDataFormat = {};
      item.tournaments.forEach(function (item2, index2) {
        var matchesDataFormat = {};
        item2.matches.forEach(function (item3, index3) {
          var marketsDataFormat = {};
          item3.markets.forEach(function (item4, index4) {
            marketsDataFormat[item4.id] = item4;
          });
          matchesDataFormat[item3.id] = item3;
        });
        tourDataFormat[item2.bfId] = {
          bfId: item2.bfId,
          id: item2.id,
          name: item2.name,
          matches: matchesDataFormat
        };
      });
      sportDataFormat[item.bfId] = {
        bfId: item.bfId,
        id: item.id,
        name: item.name,
        tournaments: tourDataFormat
      };
    });
    return sportDataFormat;
  }

  sportWise(sportsList) {
    var sportData = [];
    _.forEach(sportsList, function (item, index) {
      var data = {};
      data["id"] = item.bfId;
      data["name"] = item.name;
      data["ids"] = item.id;
      data["type"] = "EVENT_TYPE";
      sportData.push(data);
    });

    sportData.sort(function (a, b) {
      return a.ids - b.ids;
    });
    return sportData;
  }

  tournamentWise(sportsTourList) {
    var tourData = [];
    if (sportsTourList == undefined) {
      return tourData;
    }
    _.forEach(sportsTourList.tournaments, function (item, index) {
      var data = {};
      data["id"] = item.bfId;
      data["name"] = item.name;
      data["type"] = "GROUP";
      tourData.push(data);
    });
    return tourData;
  }

  matchtWise(tourMatchList) {
    var matchData = [];
    if (tourMatchList == undefined) {
      return matchData;
    }
    _.forEach(tourMatchList.matches, function (item, index) {
      var data = {};
      data["bfId"] = item.bfId;
      data["id"] = item.id;
      data["startDate"] = item.startDate;
      data["name"] = item.name;
      matchData.push(data);
    });
    return matchData;
  }

  highlightsWise(sports, tournamentId) {
    // console.log(sports, tournamentId);
    var highlightData = [];
    if (sports == undefined) {
      return highlightData;
    }
    if (tournamentId == null) {
      _.forEach(sports.tournaments, function (item, index) {
        _.forEach(item.matches, function (item2, index2) {
          _.forEach(item2.markets, function (item3, index3) {
            if (item3.name == "Match Odds") {
              item3.runnerData["bfId"] = item3.bfId;
              item3.runnerData["hasFancy"] = item2.hasFancy;
              item3.runnerData["inPlay"] = item2.inPlay;
              item3.runnerData["isBettingAllow"] = item3.isBettingAllow;
              item3.runnerData["isMulti"] = item3.isMulti;
              item3.runnerData["marketId"] = item3.id;
              item3.runnerData["matchDate"] = item2.startDate;
              item3.runnerData["matchId"] = item2.id;
              item3.runnerData["matchName"] = item2.name;
              item3.runnerData["marketName"] = item3.name;
              item3.runnerData["sportName"] = sports.name;
              item3.runnerData["sportId"] = sports.bfId;
              item3.runnerData["status"] = item2.status;
              item3.runnerData["tourId"] = item.bfId;
              item3.runnerData["mtBfId"] = item2.bfId;
              item3.runnerData["sportID"] = sports.bfId;
              item3.runnerData["tourName"] = item.name;
              highlightData.push(item3.runnerData);
            }
          });
        });
      });
    } else {
      _.forEach(sports.tournaments, function (item, index) {
        if (tournamentId == item.bfId) {
          _.forEach(item.matches, function (item2, index2) {
            _.forEach(item2.markets, function (item3, index3) {
              if (item3.name == "Match Odds") {
                item3.runnerData['bfId'] = item3.bfId;
                item3.runnerData['hasFancy'] = item2.hasFancy;
                item3.runnerData['inPlay'] = item2.inPlay;
                item3.runnerData['isBettingAllow'] = item3.isBettingAllow;
                item3.runnerData['isMulti'] = item3.isMulti;
                item3.runnerData['marketId'] = item3.id;
                item3.runnerData['matchDate'] = item2.startDate;
                item3.runnerData['matchId'] = item2.id;
                item3.runnerData['matchName'] = item2.name;
                item3.runnerData['sportName'] = sports.name;
                item3.runnerData['sportId'] = sports.bfId;
                item3.runnerData['status'] = item2.status;
                item3.runnerData['tourId'] = item.bfId;
                item3.runnerData['mtBfId'] = item2.bfId;
                item3.runnerData['sportID'] = sports.bfId;
                item3.runnerData['sport'] = item.name;
                highlightData.push(item3.runnerData);
              }
            })
          })
        }

      })
    }

    return highlightData;
  }

  searchMatchWise(sportsData) {
    var matchesData = []
    if (sportsData == undefined) {
      return matchesData;
    }
    _.forEach(sportsData, function (item, index) {
      _.forEach(item.tournaments, function (item2, index2) {
        _.forEach(item2.matches, function (item3, index3) {
          _.forEach(item3.markets, function (item4, index4) {
            if (item4.name == "Match Odds") {
              item4.runnerData['bfId'] = item4.bfId;
              item4.runnerData['inPlay'] = item3.inPlay;
              item4.runnerData['dataMode'] = item3.dataMode;
              item4.runnerData['isBettingAllow'] = item4.isBettingAllow;
              item4.runnerData['isMulti'] = item4.isMulti;
              item4.runnerData['marketId'] = item4.id;
              item4.runnerData['matchDate'] = item3.startDate;
              item4.runnerData['matchId'] = item3.id;
              item4.runnerData['matchName'] = item3.name;
              item4.runnerData['sportName'] = item.name;
              item4.runnerData['sportId'] = item.bfId;
              item4.runnerData['status'] = item3.status;
              item4.runnerData['tourId'] = item2.bfId;
              item4.runnerData['mtBfId'] = item3.bfId;
              item4.runnerData['sportID'] = item.bfId;
              item4.runnerData['sptId'] = item.bfId;
              matchesData.push(item4.runnerData);
            }
          })
        })
      })
    })
    return matchesData;
  }


  marketsWise(markets) {
    let newMarkets = [];
    _.forEach(markets, function (item, key) {
      if (item.name.indexOf('Over Line') == -1) {
        var marketItem = {};
        var runnerarray = [];
        _.forEach(item.runnerData1, function (item, key) {
          if (item.Key != undefined) {
            runnerarray.push(item.Value);
          } else {
            runnerarray.push(item);
          }
        });
        marketItem['runnerData'] = runnerarray;
        // marketItem['runnerData'] = this.RunnerWise(item.runnerData1);
        marketItem['marketName'] = item.name;
        marketItem['mktStatus'] = item.status.trim('');
        marketItem['mktId'] = item.id;
        marketItem['status'] = item.status.trim('');
        marketItem['name'] = item.name;
        marketItem['bfId'] = item.bfId;
        marketItem['id'] = item.id;
        marketItem['isBettingAllow'] = item.isBettingAllow;
        marketItem['isMulti'] = item.isMulti;
        newMarkets.push(marketItem);
      }
    })
    return newMarkets;
  }


  lineMarketsWise(markets) {
    let newMarkets = [];
    _.forEach(markets, function (item, key) {
      if (item.name.indexOf('Over Line') > -1) {
        var marketItem = {};
        var runnerarray = [];
        _.forEach(item.runnerData1, function (item, key) {
          if (item.Key != undefined) {
            runnerarray.push(item.Value);
          } else {
            runnerarray.push(item);
          }
        });
        marketItem['runnerData'] = runnerarray;
        // marketItem['runnerData'] = this.RunnerWise(item.runnerData1);
        marketItem['marketName'] = item.name;
        marketItem['mktStatus'] = item.status.trim('');
        marketItem['mktId'] = item.id;
        marketItem['status'] = item.status.trim('');
        marketItem['name'] = item.name;
        marketItem['bfId'] = item.bfId;
        marketItem['id'] = item.id;
        marketItem['isBettingAllow'] = item.isBettingAllow;
        marketItem['isMulti'] = item.isMulti;
        newMarkets.push(marketItem);
      }
    })
    return newMarkets;
  }

  // marketsWise(markets) {
  //   var newMarkets = [];
  //   _.forEach(markets, function (item, key) {
  //     var marketItem = {};
  //     var runnerarray = [];
  //     _.forEach(item.runnerData1, function (item, key) {
  //       if (item.Key != undefined) {
  //         runnerarray.push(item.Value);
  //       } else {
  //         runnerarray.push(item);
  //       }
  //     });
  //     marketItem['runnerData'] = runnerarray;
  //     // marketItem['runnerData'] = this.RunnerWise(item.runnerData1);
  //     marketItem['marketName'] = item.name;
  //     marketItem['mktStatus'] = item.status.trim('');
  //     marketItem['mktId'] = item.id;
  //     marketItem['status'] = item.status.trim('');
  //     marketItem['name'] = item.name;
  //     marketItem['bfId'] = item.bfId;
  //     marketItem['id'] = item.id;
  //     marketItem['isBettingAllow'] = item.isBettingAllow;
  //     marketItem['isMulti'] = item.isMulti;
  //     newMarkets.push(marketItem);
  //   })
  //   return newMarkets;
  // }



  // RunnerWise(runnerData1:any) {
  //   var runnerarray = [];
  //   _.forEach(runnerData1, function (item, key) {
  //     if (item.Key != undefined) {
  //       runnerarray.push(item.Value);
  //     } else {
  //       runnerarray.push(item);
  //     }
  //   });
  //   return runnerarray;
  // }


  favouriteWise(sportsData) {
    let multiMarketData = {
      groupedEvents: []
    }
    let favArray = localStorage.getItem('favourite');
    if (favArray != null) {
      favArray = JSON.parse(favArray);
      _.forEach(sportsData, function (item, index) {
        _.forEach(item.tournaments, function (item2, index2) {
          _.forEach(item2.matches, function (item3, index3) {
            _.forEach(item3.markets, function (item4, index4) {

              let mktIndex = _.indexOf(favArray, item4.id);
              if (mktIndex < 0) {

              }
              else {
                var marketItem = {};
                var runnerarray = [];
                _.forEach(item4.runnerData1, function (item, key) {
                  if (item.Key != undefined) {
                    runnerarray.push(item.Value);
                  } else {
                    runnerarray.push(item);
                  }
                });
                marketItem['runnerData'] = runnerarray;
                marketItem['marketName'] = item4.name;
                marketItem['mktStatus'] = item4.status.trim('');
                marketItem['mktId'] = item4.id;
                marketItem['status'] = item4.status.trim('');
                marketItem['name'] = item4.name;
                marketItem['bfId'] = item4.bfId;
                marketItem['id'] = item4.id;
                marketItem['isBettingAllow'] = item4.isBettingAllow;

                let eventTypeIndex = _.findIndex(multiMarketData.groupedEvents, { 'bfId': item.bfId });

                if (eventTypeIndex < 0) {
                  multiMarketData.groupedEvents.push({
                    bfId: item.bfId,
                    id: item.id,
                    name: item.name,
                    events: [{
                      tourId: item2.bfId,
                      sportId: item.bfId,
                      matchBfId: item3.bfId,
                      matchId: item3.id,
                      startDate: item3.startDate,
                      matchDate: item3.startDate,
                      inPlay: item3.inPlay,
                      name: item3.name,
                      settings: item3.settings,
                      markets: [marketItem]
                    }]
                  });
                }
                else {
                  let eventIndex = _.findIndex(multiMarketData.groupedEvents[eventTypeIndex].events, { 'matchId': item3.id });
                  // console.log(eventTypeIndex,eventIndex)
                  if (eventIndex < 0) {
                    multiMarketData.groupedEvents[eventTypeIndex].events.push({
                      sportId: item.bfId,
                      tourId: item2.bfId,
                      matchBfId: item3.bfId,
                      matchId: item3.id,
                      startDate: item3.startDate,
                      matchDate: item3.startDate,
                      inPlay: item3.inPlay,
                      name: item3.name,
                      settings: item3.settings,
                      markets: [marketItem]
                    })
                  }
                  else {
                    let mktIndex = _.findIndex(multiMarketData.groupedEvents[eventTypeIndex].events[eventIndex], { 'mktId': item4.id });
                    console.log(eventTypeIndex, eventIndex, mktIndex)
                    if (mktIndex < 0) {
                      multiMarketData.groupedEvents[eventTypeIndex].events[eventIndex].markets.push(marketItem);
                    }
                  }
                }
              }
            })
          })
        })
      })
    }

    return multiMarketData;
  }

  // GetIsFavourite(marketId) {
  //   let isfav = false;
  //   let favArray = this.GetFavourites();
  //   if (favArray != null) {
  //     favArray = JSON.parse(favArray);
  //     let mktIndex = _.indexOf(favArray, marketId);
  //     if (mktIndex < 0) {
  //       isfav = false;
  //     }
  //     else {
  //       isfav = true;
  //     }
  //   }
  //   return isfav;
  // }


  customDateFormat(date) {
    var splitdate = date.split('-');
    var splitdate2 = splitdate[2].split(' ');
    if (splitdate[1] == "Jan") {
      date = splitdate2[0] + '-01-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Feb") {
      date = splitdate2[0] + '-02-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Mar") {
      date = splitdate2[0] + '-03-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Apr") {
      date = splitdate2[0] + '-04-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "May") {
      date = splitdate2[0] + '-05-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Jun") {
      date = splitdate2[0] + '-06-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Jul") {
      date = splitdate2[0] + '-07-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Aug") {
      date = splitdate2[0] + '-08-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Sept") {
      date = splitdate2[0] + '-09-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Oct") {
      date = splitdate2[0] + '-10-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Nov") {
      date = splitdate2[0] + '-11-' + splitdate[0] + ' ' + splitdate2[1]
    } else if (splitdate[1] == "Dec") {
      date = splitdate2[0] + '-12-' + splitdate[0] + ' ' + splitdate2[1]
    } else {
      date = splitdate2[0] + '-' + splitdate[1] + '-' + splitdate[0] + ' ' + splitdate2[1]
    }
    return date.replace(/ /g, "T");
  }

  ToggleFavourite(mktId) {
    let favourite = this.GetFavourites();;
    // console.log(mktId, favourite);

    if (favourite == null) {
      let mktArray = [];
      mktArray.push(mktId)
      this.SetFavourites(mktArray);
    }
    else {
      let mktArray = JSON.parse(favourite);
      let mktIndex = _.indexOf(mktArray, mktId);
      // console.log(mktIndex);
      if (mktIndex < 0) {
        mktArray.push(mktId)
        this.SetFavourites(mktArray);
      }
      else {
        mktArray.splice(mktIndex, 1)
        this.SetFavourites(mktArray);
      }
    }
  }

  SetFavourites(mktArray) {
    localStorage.setItem('favourite', JSON.stringify(mktArray));
  }

  GetFavourites() {
    return localStorage.getItem('favourite');
  }


  matchUnmatchBetsFormat(matchBets, eventData) {
    // console.log(matchBets)
    let matchWiseBets = [];
    let totalBets = 0;
    _.forEach(matchBets, (item, index) => {
      _.forEach(item, (bet, betIndex) => {
        if (eventData != null) {
          if (eventData.mId != index) {
            return false;
          }
        }
        if (bet.backLay == 'YES') {
          bet.backLay = 'BACK';
        }
        if (bet.backLay == 'NO') {
          bet.backLay = 'LAY';
        }
        totalBets++;
        // console.log(bet,index);
        bet['stakeValid'] = true;
        bet['isActive'] = true;
        if (bet.isFancy == 0) {
          bet['profit'] = (parseFloat(bet.odds) - 1) * bet.stake;
          bet['odds'] = parseFloat(bet.odds).toFixed(2);
          bet['oldOdds'] = parseFloat(bet.odds).toFixed(2);
          bet['oldStake'] = bet.stake;
          bet['update'] = false;
        }
        if (bet.isFancy == 1 || bet.isFancy==3) {
          bet['profit'] = (parseFloat(bet.odds) * bet.stake) / 100;
        }
        if (bet.isFancy == 2) {
          if (bet.marketName == "TO WIN THE TOSS") {
            bet['profit'] = (parseFloat(bet.odds) - 1) * bet.stake;
          }
          else {
            bet['profit'] = (parseFloat(bet.odds) / 100) * bet.stake;
          }
        }
        let eventIndex = _.findIndex(matchWiseBets, { 'matchId': bet.matchId });
        if (eventIndex < 0) {
          matchWiseBets.push({
            matchId: bet.matchId,
            matchName: bet.matchName,
            sportName: bet.sportName,
            markets: [{
              marketId: bet.marketId,
              bfId: bet.bfId,
              name: bet.marketName,
              marketType: bet.isFancy,
              selections: [{
                runnerName: bet.runnerName,
                bets: [bet]
              }]
            }]
          });
        }
        else {
          let mktIndex = _.findIndex(matchWiseBets[eventIndex].markets, { 'name': bet.marketName });
          if (mktIndex < 0) {
            matchWiseBets[eventIndex].markets.push({
              marketId: bet.marketId,
              bfId: bet.bfId,
              name: bet.marketName,
              marketType: bet.isFancy,
              selections: [{
                runnerName: bet.runnerName,
                bets: [bet]
              }]
            })
          }
          else {
            let selIndex = _.findIndex(matchWiseBets[eventIndex].markets[mktIndex].selections, { 'runnerName': bet.runnerName });
            if (selIndex < 0) {
              matchWiseBets[eventIndex].markets[mktIndex].selections.push({
                runnerName: bet.runnerName,
                bets: [bet]
              })
            }
            else {
              let betIndex = _.findIndex(matchWiseBets[eventIndex].markets[mktIndex].selections[selIndex].bets, { 'id': bet.id });
              if (betIndex < 0) {
                matchWiseBets[eventIndex].markets[mktIndex].selections[selIndex].bets.push(bet);
              }
            }
          }
        }
      });
    });

    var matchWiseData = {
      matchWiseBets: matchWiseBets,
      totalBets: totalBets
    }

    return matchWiseData;

  }


}