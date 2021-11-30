import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { StorageService } from "../storage/storage.service";
import { Account } from "./account";

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class AccountsService {
    constructor(private httpClient: HttpClient, private storage: StorageService) { }

    async getAccount() {
        var account = this.storage.getAccount();
        if (account != null){
            return account;
        }

        let accounts = await this.httpClient.get<Account[]>(baseUrl + 'accounts').toPromise();
        account = accounts[0];
        this.storage.saveAccount(account);
        return account;
    }
}