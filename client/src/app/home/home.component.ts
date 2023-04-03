import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  displayedColumns: string[] = ['amount', 'details', 'date', 'account', 'organization', 'fulfiller', 'type'];

  transactions  = new BehaviorSubject([]);
  organizations = ["Astrofit Films", "Astrofit Clothing", "Astrofit Technologies", "Hlambuluka Cleaning Solutions"];
  transactionTypes = ["Income", "Expense"];

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  filter = {
    organization : 'Astrofit Clothing',
    transactionType : 'Income',
    month : 1
  }



  



  constructor(
    private transactionService : TransactionService,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
      this.transactionService.getTransactions().subscribe((data) => {
     
        this.transactionService.setLocalTransactions(data);
        this.transactions.next(data);
            
      });

     // .filter((transaction : any) => transaction.type  == "Expense")
  }

  addTransaction() {

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(TransactionFormComponent);

    dialogRef.afterClosed().subscribe( (result : any) => {
      if(result) {
        this.transactions.next(this.transactions.getValue().concat(result));

      }
    });
  }

  changeOrganization(organization : any) {

    this.filter.organization = organization;
    this.applyFilter();

  }

  changeType (type : any) {
    this.filter.transactionType = type;
    this.applyFilter();
  }

  changeMonth(month : any) {
    this.filter.month = month;
    this.applyFilter();

  }

  applyFilter() {
    let orgTransactions = this.transactionService.getLocalTransactions().filter(
      (transaction : any) => //transaction.organization == this.filter.organization && 
      //transaction.type == this.filter.transactionType && 
      this.getTransactionMonth(transaction.date) == this.filter.month
    );
    this.transactions.next(orgTransactions);

  }


  getTransactionMonth(date : string) : number {
    return new Date(date).getMonth();
  }


  
}
