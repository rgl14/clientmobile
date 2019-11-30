import { HttpRequest,HttpResponse,HttpInterceptor,HttpHandler,HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


abstract class HttpCache {
    abstract get(req :HttpRequest<any>):HttpResponse<any>|null;
    abstract put(req :HttpRequest<any>,resp:HttpResponse<any>):void;

}

@Injectable()
    export class HttpCacheService implements HttpCache {
        private cache ={};
        put(req :HttpRequest<any>,resp:HttpResponse<any>):void{
            this.cache[req.urlWithParams] =resp;
        }
        get(req :HttpRequest<any>):HttpResponse<any>|null{
            return this.cache[req.urlWithParams];
        }
    }