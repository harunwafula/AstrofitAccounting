import { Component } from '@angular/core';
import {TransactionService} from '../services/transaction.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {

  transactionForm = this.fb.group(
    {
        amount : ['', Validators.required],
        date : [new Date, Validators.required],
        details : ['', Validators.required],
        account : ['', Validators.required],
        organization : ['', Validators.required],
        fulfiller : ['', Validators.required],
        type : ['', Validators.required],

    }
  );

  organizations = ["Astrofit Films", "Astrofit Clothing", "Astrofit Technologies", "Hlambuluka Cleaning Solutions"];
  transactionTypes = ["Income", "Expense"];
  fulfillers = ["Thabo Diale", "Harun Wafula" , "Tyric Manamela" , "Lyle SoetLand", "Themba Meth"];
  startDate = new Date();
  submitted = false;

  constructor(
    private fb : FormBuilder,
    private transactionService : TransactionService,
    public dialogRef : MatDialogRef<TransactionFormComponent>
  ){}

  onSubmit() {
    if(this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value).subscribe((data) => {
        this.transactionService.addLocalTransaction(data);
        this.dialogRef.close(data);
      })
    }
   
    
  }

  

  get transFormControl () {
    return this.transactionForm.controls;
  }
}
