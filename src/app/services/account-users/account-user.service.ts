import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { User } from "./user";

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class AccountUserService {
    constructor(private httpClient: HttpClient) { }

    users: User[] = null;
    userMap: { [id: string]: User } = null;

    getUsers(accountId: number) {
        return this.httpClient.get<User[]>(baseUrl + `accounts/${accountId}/users`);
    }

    async listUsers(accountId: number) {
        if (this.users == null) {
            await this.initializeUsers(accountId);
        }
        return this.users;
    }

    async getUserMap(accountId: number) {
        if (this.userMap == null) {
            await this.initializeUsers(accountId);
        }
        return this.userMap;
    }

    async initializeUsers(accountId: number) {
        const users = await this.httpClient.get<User[]>(baseUrl + `accounts/${accountId}/users`).toPromise();
        this.users = users;
        let result: { [id: string]: User; } = {};
        users.forEach(user => {
            result[user.id] = user;
        });
        this.userMap = result;
    }
}
