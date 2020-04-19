import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    ACCESS_TOKEN_EXPIRED = 'Access token expired';
    INVALID_REFRESH_TOKEN = 'Invalid refresh token (expired)';

    constructor(
        private store$: Store,
        private router: Router,
        private notiService: NotificationService,
    ) { }

    urlTemp = undefined;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token')

        request = this.addAuthenticationToken(request, false);
        request = this.addContentType(request);

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body&&request.method!='GET'&&request.method!='POST'&&event.body) {                        
                        console.log('HttpRequest', request.method)
                        // console.log('HttpResponse', event)
                        this.notiService.onSuccess(event.body.title,event.body.description)
                    }

                    try {
                        if (event.body.success === false) {
                            setTimeout(() => {
                                this.urlTemp = undefined;
                            },
                                4000);
                            if (this.urlTemp !== event.url) {
                                console.error(event.body.desc, 'error');
                            }
                            this.urlTemp = event.url;

                        } else if (event.body.desc) {
                            console.log(event.body.desc, 'success');
                        }
                    } catch (error) {

                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log('error:', error);

                if (error.status !== 401) {
                    if(error.status == 404){
                        console.log('error',error);                        
                        this.notiService.onWarning('Warning', error.statusText)
                    }else if(error.status == 400){
                        this.notiService.onError('Warning', error.statusText)
                    }else if(error.status >= 500){
                        this.notiService.onError('Error', error.statusText)
                    }
                    return throwError(error);
                }

                if (error.status === 401) {
                    if (error.error.error_description.includes(this.ACCESS_TOKEN_EXPIRED)) {
                        /* Access token expired */

                    } else if (error.error.error_description.includes(this.INVALID_REFRESH_TOKEN)) {
                        /* Invalid refresh token(expired)*/
                        this.router.navigate(['login'], {})
                        return throwError(error);
                    } else {
                        return throwError(error);
                    }
                } else {
                    this.notiService.onError('Error', (error.message))
                    return throwError(error);
                }
            }));
    }

    addContentType(request: HttpRequest<any>): HttpRequest<any> {
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }
        return request;
    }

    addAuthenticationToken(request: HttpRequest<any>, isTest: boolean = false): HttpRequest<any> {
        const token = localStorage.getItem('token')
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        }
        return request;
    }
}
