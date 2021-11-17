import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import 'rxjs/add/operator/first';
import { first } from "rxjs/operators";
import { resolve } from "dns";

const accountsUrl = 'https://localhost:44373/api/accounts';

export class AccountsService{
    constructor(private httpClient: HttpClient){}

    getAccount():Account{
        let accounts = this.listAccounts();
        let account = accounts
        .pipe(first())
        .subscribe((a:any)=>{
            resolve(a);
        });
        
    }

    listAccounts():Observable<Account[]>{
        return this.httpClient.get<Account[]>(accountsUrl);
    }
}

export interface Account{
    id:number;
    firstDayOfTheBudget:number;
}