import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CommonService } from 'src/services/common.service';
import { Observable,throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private injector:Injector,private router: Router,private cookie:CookieService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let authservice=this.injector.get(CommonService);
    let tokenizedReq=req.clone({setHeaders:{Token:authservice.getToken()}});
    // console.log(tokenizedReq)
    return next.handle(tokenizedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        if(error.status==401){
          this.cookie.delete('charlie');
          this.router.navigateByUrl("");
          window.location.reload();
        }
        return throwError(errorMessage);
      })
    )
  }
}
