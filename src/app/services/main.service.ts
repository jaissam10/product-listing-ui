import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  locationsArr: any = [];
  listingBS = new BehaviorSubject('');
  listingObs = this.listingBS.asObservable();

  constructor(private http: HttpClient) {
  }

  getCatalog(): Observable<any> {
    return this.http.get('assets/catalog.json');
  }

  changeListing(value) {
    this.listingBS.next(value); // this will be called whenever locationArr (json value) is fetched on header....to trigger on other page
  }
}
