import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import {environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
   APIURL = environment.apiUrl;

  transactions : any = [];

  constructor(private httpClient : HttpClient) { }

  
  addTransaction(transactionData: any) : Observable<any>  {
    return this.httpClient.post(this.APIURL + "/addTransaction", transactionData);
  }

  getTransactions() : Observable <any> {
    return this.httpClient.get(this.APIURL + "/getTransactions");
  }

  setLocalTransactions (transactions : any) {
    this.transactions = transactions;
  }

  addLocalTransaction(transaction : any) {
    this.transactions.push(transaction);

  }

  getLocalTransactions() {
    return this.transactions;
  }
}
