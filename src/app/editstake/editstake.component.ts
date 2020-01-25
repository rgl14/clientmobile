import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-editstake',
  templateUrl: './editstake.component.html',
  styleUrls: ['./editstake.component.scss']
})
export class EditstakeComponent implements OnInit {
  stake1: any;
  stake2: any;
  stake3: any;
  stake4: any;
  stake5: any;
  stake6: any;
  stake7: any;
  stake8: any;
  isedit: boolean=true;
  defaultstake: number;
  isChecked:boolean;
  isOddsHighlights: any;
  stake: any;
  isfancyChecked: any;
  fancypanelsetting: boolean=false;
  fancyCheckedLS: string;
  constructor(private commonservice:CommonService,public notification :NotificationService) { }

  ngOnInit() {
    this.getbetstakesetting();
    
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  getbetstakesetting(){
    this.commonservice.getsetting().subscribe(resp=>{
      this.stake=resp.betStake;
      this.stake1=resp.betStake.stake1
      this.stake2=resp.betStake.stake2
      this.stake3=resp.betStake.stake3
      this.stake4=resp.betStake.stake4
      this.stake5=resp.betStake.stake5
      this.stake6=resp.betStake.stake6
      this.stake7=resp.betStake.stake7
      this.stake8=resp.betStake.stake8
      this.defaultstake=resp.defaultStake
      this.isOddsHighlights=resp.isOddsHighlights
      if(this.isOddsHighlights==0){
        this.isChecked=false;
        var btntoggle="0"
        localStorage.setItem("Highlightodds",btntoggle)
      }else{
        var btntoggle="1"
        this.isChecked=true
        localStorage.setItem("Highlightodds",btntoggle)
      }
      this.fancyCheckedLS=localStorage.getItem("FancyPanelSetting");
      if(this.fancyCheckedLS=="true"){
        this.isfancyChecked=true;
      }else{
        this.isfancyChecked=false;
      }
      console.log(this.isfancyChecked)
    })
  }
  editStake(){
    this.isedit=false;
  }
  saveStake(){
    this.isedit=true;
    let stakedaata={
          "stake1":this.stake1,
          "stake2":this.stake2,
          "stake3":this.stake3,
          "stake4":this.stake4,
          "stake5":this.stake5,
          "stake6":this.stake6,
          "stake7":this.stake7,
          "stake8":this.stake8,
        }
    this.commonservice.SaveBetStakeSetting(stakedaata).subscribe(resp=>{
      if(resp.status){
        this.notification.success(resp.result);
        this.getbetstakesetting();
      }else{
        this.notification.error(resp.result);
      }
    })
  }
  onChange(event){
    console.log(this.isChecked)
  }
  onFancyChange(event){
    localStorage.setItem("FancyPanelSetting",this.isfancyChecked);
  }
  saveSetting(){
    let btntoggle:string;
    if(this.isChecked){
      btntoggle="1";
    }else{
      btntoggle="0";
    }
    let settingdata={"btntoggle":btntoggle,"defaultstake":this.defaultstake}
    this.commonservice.savesetting(settingdata).subscribe(resp=>{
      if(resp.status){
        localStorage.setItem("Highlightodds",btntoggle);
        this.notification.success(resp.result);
      }else{
        this.notification.error(resp.result);
      }
    })
  }

}
