import { Injectable } from "@angular/core";
import { Account } from "../accounts/account";

@Injectable()
export class StorageService {
    saveAccount(account: Account) {
        var json = JSON.stringify(account);
        window.sessionStorage.setItem("account", json);
    }

    getAccount(): Account {
        var json = window.sessionStorage.getItem("account");
        if (json == null) {
            return null;
        }

        let account: Account = JSON.parse(json);
        return account;
    }
}