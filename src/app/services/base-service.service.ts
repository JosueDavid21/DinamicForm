import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConstants } from "../constants/app-constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export abstract class BaseService<T> {

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  protected urlBase = AppConstants.BASE_URL;

  constructor(protected http: HttpClient) {
  }

  abstract endpointBase(): string;

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.urlBase + this.endpointBase + "/all", this.httpOptions);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.urlBase}${this.endpointBase}/${id}`, this.httpOptions);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.urlBase + this.endpointBase, entity, this.httpOptions);
  }

  update(id: number, entity: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.urlBase}${this.endpointBase}/${id}`, entity, this.httpOptions);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}${this.endpointBase}/${id}`, this.httpOptions);
  }
}
