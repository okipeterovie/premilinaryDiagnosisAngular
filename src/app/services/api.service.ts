import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {utility} from './constant';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  SERVER_URL = "http://localhost:8083/api";

  suppressAlertError: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  public getWithoutAction(actionUrl: any, options?: any): Observable<any> {
    const url = actionUrl;
    if (options) {
      return this.httpClient.get<any>(url, options).pipe(map(response => {
        return response;
      }), catchError(error => {
        return this.handleError(error);
      }));
    } else {
      return this.httpClient.get<any>(url).pipe(map(response => {
        return response;
      }), catchError(error => {
        return this.handleError(error);
      }));
    }
  }

  public get(actionUrl: any, options?: any): Observable<any> {
    const url = this.SERVER_URL + actionUrl;
    if (options) {
      return this.httpClient.get<any>(url, options).pipe(map(response => {
        return response;
      }), catchError(error => {
        return this.handleError(error);
      }));
    } else {
      return this.httpClient.get<any>(url).pipe(map(response => {
        return response;
      }), catchError(error => {
        return this.handleError(error);
      }));
    }
  }

  public post(actionUrl: any, request: any, options?: any): Observable<any> {
    const url = this.SERVER_URL + actionUrl;
    if (options) {
      return this.httpClient.post<any>(url, request, options).pipe(map(response => {
        return response;
      }), catchError(error => {
        return this.handleError(error);
      }));
    } else {
      return this.httpClient.post<any>(url, request).pipe(map(response => {
        return response;
      }), catchError(error => {
        return this.handleError(error);
      }));
    }
  }


  public get_(actionUrl: any): Observable<any> {
    return this.get(actionUrl, {headers: utility.allHeader});
  }

  public post_(actionUrl: any, request: any): Observable<any> {
    return this.post(actionUrl, request, {headers: utility.allHeader});
  }

  public downloadFile(actionUrl: any): Observable<any> {
    return this.get(actionUrl, {responseType: 'blob'});
  }

  public downloadFilePdf(url: string, filename: string) {
    this.downloadFile_(url, filename, "application/pdf");
  }

  public downloadFileExcel(url: string, filename: string) {
    this.downloadFile_(url, filename, "application/octet-stream");
  }

  public downloadFile_(url: string, filename: string, fileType: string) {
    this.downloadFile(url).subscribe(response => {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([response], {type: fileType});

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      let windowNavigatorVariable: any = window.navigator;
      if (windowNavigatorVariable && windowNavigatorVariable.msSaveOrOpenBlob) {
        windowNavigatorVariable.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download = filename;

      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

  public uploadFile(actionUrl: any, request: any): Observable<any> {
    return this.post(actionUrl, request, {reportProgress: true, observe: 'events'});
  }

  handleError(error: HttpErrorResponse) {
    if (this.suppressAlertError) {
      console.log(error);
      return throwError(error);
    } else {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
      }
      // window.alert(errorMessage);
      return throwError(errorMessage);
    }
  }

  handleErrorWithConsole(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

  public getWithHeader(actionUrl: any, httpHeaders: HttpHeaders): Observable<any> {
    return this.get(actionUrl, {headers: httpHeaders});
  }

  public postWithHeader(actionUrl: any, requestBody: any, httpHeaders: HttpHeaders): Observable<any> {
    return this.post(actionUrl, requestBody, {headers: httpHeaders});
  }


}
