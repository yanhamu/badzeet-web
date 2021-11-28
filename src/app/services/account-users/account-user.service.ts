import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { User } from "./user";

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class AccountUserService {
    constructor(private httpClient: HttpClient) { }

    getUsers(accountId: number) {
        return this.httpClient.get<User[]>(baseUrl + `accounts/${accountId}/users`);
    }

    async listUsers(accountId: number) {
        return await this.httpClient.get<User[]>(baseUrl + `accounts/${accountId}/users`).toPromise();
    }

    async getUserMap(accountId: number) {
        const users = await this.getUsers(accountId).toPromise();
        let result: { [id: string]: User; } = {};
        users.forEach(user=>{
            result[user.id] = user;
        });
        return result;
    }
}
