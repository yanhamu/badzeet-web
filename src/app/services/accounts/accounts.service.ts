import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { StorageService } from "../storage/storage.service";
import { Account } from "./account";
import { first, single, switchMap, take } from 'rxjs/operators';
import { Observable } from "rxjs/internal/Observable";
import { forkJoin, of } from "rxjs";


const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class AccountsService {
    constructor(private httpClient: HttpClient, private storage: StorageService) { }

    async getAccount() {
        var account = this.storage.getAccount();
        if (account != null) {
            return account;
        }

        let accounts = await this.httpClient.get<Account[]>(baseUrl + 'accounts').toPromise();
        account = accounts[0];
        this.storage.saveAccount(account);
        return account;
    }

    getAccountObservable(): Observable<Account> {
        var account = this.storage.getAccount();
        if (account != null) {
            return of(account);
        }

        return this.httpClient.get<Account[]>(baseUrl + 'accounts').pipe(
            first(),
            switchMap((x: Account[]) => {
                return of(x[0]);
            }))
    }
}
