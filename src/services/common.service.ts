import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  error(error: HttpErrorResponse) {
    throw new Error("Method not implemented.");
  }

  constructor(private httpclient:HttpClient,private cookie:CookieService) { }
  public apiurl:string="http://173.249.43.228/GoLuckyClient/Client.svc"
  // public apilink:string="http://139.180.146.253/DtsGlobalMaintenance/api/postFile"
  public authtoken=this.cookie.get('charlie');

  uservalidate():boolean{
    let cookiedata=this.cookie.check('test');
    if(cookiedata)
    {
      console.log(cookiedata)
      return true;
    }else{
      return false;
    }
  }

  login(data:any) : Observable<any>{
    var usersdata={
      "context":"mobile",
      "pwd":data.password,
      "username":data.username
    }
    return this.httpclient.post(this.apiurl+"/Login",usersdata);
  }

  getToken(){
    return this.cookie.get('charlie');
  }

  userdescription() : Observable<any>{
    return this.httpclient.get(this.apiurl+"/Data/UserDescription");
  }
  
  funds() : Observable<any>{
    return this.httpclient.get(this.apiurl+"/Data/FundExpo")
  }

  getsetting() : Observable<any>{
    return this.httpclient.get(this.apiurl+"/Settings/GetSettings")
  }

  getbetstakesetting() : Observable<any>{
    return this.httpclient.get(this.apiurl+"/Settings/GetBetStakeSetting")
  }

  SaveBetStakeSetting(data:any) : Observable<any>{
    var stakevalue=data;
    return this.httpclient.post(this.apiurl+"/Settings/SaveBetStakeSetting",stakevalue);
  }

  savesetting(data:any):Observable<any>{
    return this.httpclient.post(this.apiurl+"/Settings/SaveSetting?s="+data.defaultstake+"&o="+data.btntoggle,{});
  }

  getuserdata() :  Observable<any>{
    return this.httpclient.get(this.apiurl+"/Data/GetUserData")
  }

  gethubaddress(id) : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Data/HubAddress?id="+id)
  }

  getexposurebook(id) : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Bets/ExposureBook?mktid="+id)
  }

  getfancyexposurebook(matchId,fancyId) : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Bets/GetFancyExposure?mtid="+matchId+"&fid="+fancyId)
  }

  getfancybook(matchId,fancyId) : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Bets/Fancybook?mtid="+matchId+"&fid="+fancyId)
  }

  getBMexposurebook(marketId,bookId) : Observable <any>{
    return this.httpclient.get(this.apiurl+'/Bets/BMExposureBook?mktid='+marketId+'&bid='+bookId)
  }

  PlaceMOBet(data): Observable<any> {
    return this.httpclient.post(`${this.apiurl}/Bets/PlaceMOBet`, data);
  }

  PlaceFancyBet(data): Observable<any> {
    return this.httpclient.post(`${this.apiurl}/Bets/PlaceFancyBet`, data);
  }
  PlaceBMBet(data): Observable<any> {
    return this.httpclient.post(`${this.apiurl}/Bets/PlaceBookBet`, data);
  }

  termsnconditions() : Observable<any> {
    return this.httpclient.get(this.apiurl+"/TermsNConditions")
  }

  activitylog() : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Reports/ActivityLog")
  }

  marketresult() : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Reports/GetResults?from=&to=")
  }

  accountstatement(accountstatdates) : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Reports/AccountStatement?from="+accountstatdates.fromdate+"&to="+accountstatdates.todate)
  }

  mybets() : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Reports/GetCurrentBets")
  }

  marketprofitloss(dates) : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Reports/GetProfitLoss?from="+dates.fromdate+"&to="+dates.todate)
  }

  transactionstatement(accountstatdates) : Observable <any>{
    return this.httpclient.get(this.apiurl+"/Reports/AccountStatement?from="+accountstatdates.fromdate+"&to="+accountstatdates.todate+"&filter=1")
  }

  changepassword(passwords) : Observable<any>{
    var data={
              "changeBy":"",
              "context":"mobile",
              "newPwd":passwords.newpassword,
              "oldPwd":passwords.oldpassword
            }
    return this.httpclient.post(this.apiurl+"/ChangePwd",data);
  }

  logout() : Observable<any>{
    var data={};
    return this.httpclient.post(this.apiurl+"/Logout",data);
  }
  

  // putmethod() : Observable<any>{
  //   let data:any={"filepath":"E:\\fo08NOV2019bhav.csv"}
  //   var apiheaders=new HttpHeaders({"content-type":"application/json"})
  //   return this.httpclient.put(`${this.apilink}?exch=1`,data,{headers:apiheaders}).pipe(catchError(this.handleError))
  // }
  // handleError(error: HttpErrorResponse){
  //   console.log(error);
  //   return throwError(error);
  // }

  

}
