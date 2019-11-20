import { Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackbar:MatSnackBar) { }

  config:MatSnackBarConfig = {
    duration:3000,
    horizontalPosition:'right',
    verticalPosition:'bottom'
  }

  success(msg:string){
    this.config['panelClass'] = ['success']
    this.snackbar.open(msg,'',this.config);
  }
  error(msg:string){
    this.config['panelClass'] = ['error']
    this.snackbar.open(msg,'',this.config);
  }
  warning(msg:string){
    this.config['panelClass'] = ['warning']
    this.snackbar.open(msg,'',this.config);
  }
  notificationsnackbar(msg:string){
    this.config['panelClass'] = ['notification']
    this.snackbar.open(msg,'',this.config);
  }
}