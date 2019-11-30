import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// const BASEURL = "http://167.86.74.159/InningsClient/InningsClient.svc";
// const BETURL = "http://167.86.74.159/InningsBet/InningsClient.svc";

const BASEURL = "http://www.thegodexch.com/Client/GodExchClient.svc";
const BETURL = "http://www.thegodexch.com/Bet/GodExchClient.svc";

@Injectable({
  providedIn: 'root'
})
export class PlaceBetsService {

  betsSource: Observable<any>;
  private currentBets: BehaviorSubject<any>

  allBetsSource: Observable<any>;
  private currentAllBets: BehaviorSubject<any>

  allMatchUnmatchBetsSource: Observable<any>;
  private currentAllMatchUnmatchBets: BehaviorSubject<any>

  matchedBetsSource: Observable<any>;
  private currentMatchedBets: BehaviorSubject<any>

  exposureSource: Observable<any>;
  private currentExposure: BehaviorSubject<any>;

  fancyExposureSource: Observable<any>;
  private currentFancyExposure: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentBets = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.betsSource = this.currentBets.asObservable();

    this.currentAllBets = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.allBetsSource = this.currentAllBets.asObservable();

    this.currentAllMatchUnmatchBets = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.allMatchUnmatchBetsSource = this.currentAllMatchUnmatchBets.asObservable();

    this.currentMatchedBets = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.matchedBetsSource = this.currentMatchedBets.asObservable();

    this.currentExposure = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.exposureSource = this.currentExposure.asObservable();

    this.currentFancyExposure = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.fancyExposureSource = this.currentFancyExposure.asObservable();
  }

  shareBetsData(data: any) {
    this.currentBets.next(data);
  }

  shareAllBetsData(data: any) {
    this.currentAllBets.next(data);
  }

  shareAllMatchUnmatchBetsData(data: any) {
    this.currentAllMatchUnmatchBets.next(data);
  }

  shareMatchedBetsData(data: any) {
    this.currentMatchedBets.next(data);
  }

  shareExposure(data: any) {
    this.currentExposure.next(data);
  }

  shareFancyExposure(data: any) {
    this.currentFancyExposure.next(data);
  }

  PlaceMOBet(data): Observable<any> {
    return this.http.post(`${BETURL}/Bets/PlaceMOBet3`, data);
  }

  EditMOBet(data): Observable<any> {
    return this.http.post(`${BASEURL}/Bets/EditMOBet`, data);
  }

  CancelBet(id): Observable<any> {
    return this.http.post(`${BASEURL}/Bets/CancelBet?id=${id}`, id);
  }

  PlaceLineBet(data): Observable<any> {
    return this.http.post(`${BETURL}/Bets/PlaceLineBet`, data);
  }

  PlaceFancyBet(data): Observable<any> {
    return this.http.post(`${BETURL}/Bets/PlaceFancyBet2`, data);
  }
  PlaceBMBet(data): Observable<any> {
    return this.http.post(`${BETURL}/Bets/PlaceBMBet2`, data);
  }
}
